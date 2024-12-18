import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Check } from "lucide-react-native";
import { colors } from "../../constants/colors";

interface Props extends TouchableOpacityProps {
  checked: boolean;
  onPress(): void;
}

export function CheckBox({ checked, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.checkButton}
      onPress={onPress}
      testID="check-box"
    >
      {checked ? (
        <View style={styles.check} testID="checked">
          <Check size={18} color={colors.white} />
        </View>
      ) : (
        <View style={styles.unChecked} testID="unchecked" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkButton: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  check: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.orange,
    borderRadius: 4,
  },
  unChecked: {
    width: 24,
    height: 24,
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray_1,
  },
});
