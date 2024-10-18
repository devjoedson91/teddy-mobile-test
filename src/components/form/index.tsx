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
  wage: z
    .string({ message: "O salário é obrigatório" })
    .min(1, { message: "O salário é obrigatório" })
    .regex(/\d/g, { message: "Valor inválido" }),
  companyWage: z
    .string({ message: "O valor da empresa é obrigatório" })
    .min(1, { message: "O valor da empresa é obrigatório" })
    .regex(/\d/g, { message: "Valor inválido" }),
});

type FormData = z.infer<typeof schema>;

export function Form() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      wage: "",
      companyWage: "",
    },
    resolver: zodResolver(schema),
  });

  const wage = watch("wage");
  const companyWage = watch("companyWage");

  useEffect(() => {
    setValue("wage", formatCurrency(wage));
  }, [wage]);

  useEffect(() => {
    setValue("companyWage", formatCurrency(companyWage));
  }, [companyWage]);

  function handleCreateCustomer(data: FormData) {
    console.log(data);
  }

  return (
    <View style={styles.formContainer}>
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
        error={errors.wage?.message}
        keyboardType="numeric"
      />

      <FormInput
        name="companyWage"
        label="Valor da empresa"
        control={control}
        placeholder="Digite o valor da empresa"
        error={errors.companyWage?.message}
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
});
