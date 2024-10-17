import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants/colors";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export function CustomerItem() {
  const [visible, setVisible] = useState(false);

  function handleDeleteCustomer() {}

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
        <Pressable onPress={() => setVisible(true)}>
          <Feather name="trash-2" size={20} color="red" />
        </Pressable>
      </View>

      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        transparent
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalTitle}>Excluir cliente:</Text>
              <Text style={styles.modalDescription}>
                Tem certeza que deseja excluir o cliente Eduardo
              </Text>
            </View>
            <Pressable style={styles.option} onPress={handleDeleteCustomer}>
              <Text style={styles.optionText}>Excluir cliente</Text>
            </Pressable>
            <Pressable style={styles.option} onPress={() => setVisible(false)}>
              <Text style={styles.optionText}>Cancelar</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.modalBackground,
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 16,
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 20,
    color: colors.white,
    marginBottom: 4,
  },
  modalDescription: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    color: colors.white,
    marginBottom: 20,
  },
  option: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
    color: colors.blue,
    fontWeight: 700,
  },
});
