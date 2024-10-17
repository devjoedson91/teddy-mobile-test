import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import { CustomerItem } from "../../components/customer-item";
import { Header } from "@/src/components/header";

export default function Customers() {
  return (
    <View>
      <Header />
      <View style={styles.content}>
        <CustomerItem />
        <CustomerItem />
        <CustomerItem />
        <Pressable style={styles.buttonCreate}>
          <Text style={styles.textCreate}>Criar cliente</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
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
