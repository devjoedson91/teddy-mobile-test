import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "../../../constants/colors";

interface InputProps {
  name: string;
  label: string;
  control: any;
  placeholder?: string;
  rules?: object;
  error?: string;
  keyboardType: KeyboardTypeOptions;
}

export function FormInput({
  name,
  label,
  control,
  error,
  placeholder,
  rules,
  keyboardType,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.gray_2}
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
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
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray_2,
    fontSize: 16,
    fontWeight: "400",
    paddingRight: 12,
    paddingLeft: 12,
    backgroundColor: "transparent",
    color: colors.white,
  },
  errorText: {
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 4,
  },
});
