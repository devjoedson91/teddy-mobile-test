import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { CustomerItem } from "../../components/customer-item";

export default function Customers() {
  return (
    <View style={styles.container}>
      <CustomerItem />
      <CustomerItem />
      <CustomerItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 16,
    gap: 20,
  },
});
