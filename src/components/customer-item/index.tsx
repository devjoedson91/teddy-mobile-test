import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export function CustomerItem() {
  return <View style={styles.containerItem}></View>;
}

const styles = StyleSheet.create({
  containerItem: {
    width: "100%",
    height: 138,
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
});
