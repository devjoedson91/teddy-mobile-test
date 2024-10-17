import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export function CustomerItem() {
  return (
    <View style={styles.containerItem}>
      <View style={styles.customerData}>
        <Text style={styles.nameText}>Joedson</Text>
        <Text style={styles.valuesText}>Salário: R$3.500,00</Text>
        <Text style={styles.valuesText}>Empresa: R$120.000,00</Text>
      </View>
      <View style={styles.controls}>
        <Pressable>
          <Feather name="plus" size={20} />
        </Pressable>
        <Pressable>
          <Octicons name="pencil" size={20} />
        </Pressable>
        <Pressable>
          <Feather name="trash-2" size={20} color="red" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    width: "100%",
    height: 138,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 4,
    justifyContent: "space-between",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameText: {
    fontWeight: 700,
    fontSize: 16,
  },
  valuesText: {
    fontSize: 14,
    fontWeight: 400,
  },
  customerData: {
    alignItems: "center",
    gap: 10,
  },
});
