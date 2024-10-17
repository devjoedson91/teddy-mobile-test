import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import { CustomerItem } from "../../components/customer-item";
import { Header } from "@/src/components/header";

export default function Customers() {
  return (
    <View>
      <Header />
      <View style={styles.content}>
        <View>
          <Text style={styles.textHeader}>
            <Text style={{ fontWeight: "bold" }}>0</Text> clientes encontrados:
          </Text>
          <Text style={styles.textHeader}>Clientes por página: </Text>
        </View>
        <View style={{ height: "50%" }}>
          <FlatList
            data={Array.from({ length: 4 })}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => <CustomerItem />}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
    borderColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  textCreate: {
    fontWeight: 700,
    color: colors.orange,
    fontSize: 14,
  },
  textHeader: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: 400,
  },
});
