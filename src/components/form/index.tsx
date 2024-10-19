import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./form-input";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { formatCurrency } from "../../lib/utils";
import { ClientsProps } from "../../@types";
import api from "../../services/api";

const schema = z.object({
  name: z
    .string({ message: "O nome é obrigatório" })
    .min(1, { message: "O nome é obrigatório" }),
  salary: z
    .string({ message: "O salário é obrigatório" })
    .min(1, { message: "O salário é obrigatório" })
    .regex(/\d/g, { message: "Valor inválido" }),
  companyValuation: z
    .string({ message: "O valor da empresa é obrigatório" })
    .min(1, { message: "O valor da empresa é obrigatório" })
    .regex(/\d/g, { message: "Valor inválido" }),
});

type FormData = z.infer<typeof schema>;

interface FormProps {
  label: string;
  methodType: "post" | "patch";
  data?: ClientsProps;
  onCloseModal(): void;
}

export function Form({ label, methodType, data, onCloseModal }: FormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: data?.name || "",
      salary: String(data?.salary) || "",
      companyValuation: String(data?.companyValuation) || "",
    },
    resolver: zodResolver(schema),
  });

  const salary = watch("salary");
  const companyValuation = watch("companyValuation");

  useEffect(() => {
    setValue("salary", formatCurrency(salary));
  }, [salary]);

  useEffect(() => {
    setValue("companyValuation", formatCurrency(companyValuation));
  }, [companyValuation]);

  async function handleCreateOrEditCustomer(formData: FormData) {
    const body = {
      name: formData.name,
      salary: Number(formData.salary.replace(/[R$\., ]/g, "")),
      companyValuation: Number(
        formData.companyValuation.replace(/[R$\., ]/g, "")
      ),
    };

    try {
      if (methodType === "post") {
        await api.post("/users", body);

        reset();
      } else if (methodType === "patch") {
        if (!data?.id) return;

        await api.patch(`/users/${data.id}`, body);
      }

      onCloseModal();
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>{label}</Text>

      <FormInput
        name="name"
        label="Nome"
        control={control}
        placeholder="Digite o nome"
        error={errors.name?.message}
        keyboardType="default"
        testID="name"
      />

      <FormInput
        name="salary"
        label="Salário"
        control={control}
        error={errors.salary?.message}
        keyboardType="numeric"
        testID="salary"
      />

      <FormInput
        name="companyValuation"
        label="Valor da empresa"
        control={control}
        error={errors.companyValuation?.message}
        keyboardType="numeric"
        testID="companyValuation"
      />

      <Pressable
        style={[styles.submit, !isValid && { opacity: 0.5 }]}
        onPress={handleSubmit(handleCreateOrEditCustomer)}
        disabled={!isValid}
      >
        <Text style={styles.submitText}>
          {methodType === "post" ? "Criar cliente" : "Editar cliente"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    gap: 20,
  },
  submit: {
    backgroundColor: colors.orange,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
  },
  label: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
