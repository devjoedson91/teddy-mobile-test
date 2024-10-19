import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../../constants/colors";

interface ButtonProps {
  title: string;
  onPress(): void;
}

export function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable style={styles.buttonCreate} onPress={onPress}>
      <Text style={styles.textCreate}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textCreate: {
    fontWeight: "700",
    color: colors.orange,
    fontSize: 16,
  },
  buttonCreate: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
});
