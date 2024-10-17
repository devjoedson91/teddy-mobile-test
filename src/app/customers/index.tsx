import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import { CustomerItem } from "../../components/customer-item";

export default function Customers() {
  return (
    <View style={styles.container}>
      <CustomerItem />
      <CustomerItem />
      <CustomerItem />
      <Pressable style={styles.buttonCreate}>
        <Text style={styles.textCreate}>Criar cliente</Text>
      </Pressable>
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
  buttonCreate: {
    height: 40,
    borderWidth: 2,
    borderColor: colors.mainOrange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  textCreate: {
    fontWeight: 700,
    color: colors.mainOrange,
    fontSize: 14,
  },
});
