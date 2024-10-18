import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./form-input";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { formatCurrency } from "@/src/lib/utils";

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
}

export function Form({ label }: FormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      salary: "",
      companyValuation: "",
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

  function handleCreateCustomer(data: FormData) {
    console.log(data);
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
      />

      <FormInput
        name="wage"
        label="Salário"
        control={control}
        placeholder="Digite o salário"
        error={errors.salary?.message}
        keyboardType="numeric"
      />

      <FormInput
        name="companyWage"
        label="Valor da empresa"
        control={control}
        placeholder="Digite o valor da empresa"
        error={errors.companyValuation?.message}
        keyboardType="numeric"
      />

      <Pressable
        style={[styles.submit, !isValid && { opacity: 0.5 }]}
        onPress={handleSubmit(handleCreateCustomer)}
        disabled={!isValid}
      >
        <Text style={styles.submitText}>Criar cliente</Text>
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
