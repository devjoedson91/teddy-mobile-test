import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "../../../constants/colors";

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  rules?: object;
  error?: string;
}

export function Input({
  name,
  control,
  error,
  placeholder,
  rules,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.gray_2}
            style={styles.input}
            value={value || ""}
            onChangeText={onChange}
          />
        )}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  input: {
    height: 60,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray_2,
    fontSize: 24,
    fontWeight: "400",
    paddingRight: 12,
    paddingLeft: 12,
  },
  errorText: {
    marginTop: 4,
    color: "red",
  },
});
