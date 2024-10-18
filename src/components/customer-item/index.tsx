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
import { Pencil, Trash2 } from "lucide-react-native";

export function CustomerItem() {
  const [visible, setVisible] = useState(false);

  function handleRemoveCustomer() {}

  return (
    <View style={styles.containerItem}>
      <View style={styles.customerData}>
        <Text style={styles.nameText}>Joedson</Text>
        <Text style={styles.valuesText}>Salário: R$3.500,00</Text>
        <Text style={styles.valuesText}>Empresa: R$120.000,00</Text>
      </View>
      <View style={styles.controls}>
        <Pressable>
          <Pencil size={20} />
        </Pressable>
        <Pressable onPress={() => setVisible(true)} testID="button-remove">
          <Trash2 size={20} color="red" />
        </Pressable>
      </View>

      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        transparent
        testID="modal-remove-customer"
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
            <Pressable style={styles.option} onPress={handleRemoveCustomer}>
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
    fontWeight: "700",
    fontSize: 16,
  },
  valuesText: {
    fontSize: 14,
    fontWeight: "400",
  },
  customerData: {
    alignItems: "center",
    gap: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: colors.modalBackground,
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 20,
    width: "100%",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: colors.white,
    marginBottom: 4,
  },
  modalDescription: {
    textAlign: "center",
    fontWeight: "400",
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
    fontWeight: "700",
  },
});
