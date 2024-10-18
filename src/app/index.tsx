import { Text, View, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { router } from "expo-router";
import { Input } from "../components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string({ message: "O nome é obrigatório" })
    .min(1, { message: "O nome é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function Welcome() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleNavigation(data: FormData) {
    router.push("/home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Olá, seja bem-vindo!</Text>

      <Input
        name="name"
        control={control}
        placeholder="Digite o seu nome"
        error={errors.name?.message}
      />

      <Pressable style={styles.signIn} onPress={handleSubmit(handleNavigation)}>
        <Text style={styles.signInText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: colors.white,
  },
  welcomeText: {
    fontSize: 32,
    color: colors.black,
    fontWeight: "400",
  },
  signIn: {
    backgroundColor: colors.orange,
    width: "100%",
    height: 60,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontWeight: "700",
    color: colors.white,
    fontSize: 24,
  },
});
