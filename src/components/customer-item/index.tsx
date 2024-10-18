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
import { Form } from "../form";
import { CustomerProps } from "../../@types";
import { customerItemMock } from "../__mocks__/customer-item.mock";

interface CustomerItemProps {
  data: CustomerProps;
}

export function CustomerItem({ data }: CustomerItemProps) {
  const [alertVisible, setAlertVisible] = useState(false);

  const [formVisible, setFormVisible] = useState(false);

  function handleRemoveCustomer() {}

  return (
    <View style={styles.containerItem}>
      <View style={styles.customerData}>
        <Text style={styles.nameText}>{data.name}</Text>
        <Text style={styles.valuesText}>{`Salário: ${data.salary}`}</Text>
        <Text
          style={styles.valuesText}
        >{`Empresa: ${data.companyValuation}`}</Text>
      </View>
      <View style={styles.controls}>
        <Pressable onPress={() => setFormVisible(true)} testID="button-edit">
          <Pencil size={20} color={colors.black} />
        </Pressable>
        <Pressable onPress={() => setAlertVisible(true)} testID="button-remove">
          <Trash2 size={20} color="red" />
        </Pressable>
      </View>

      <Modal
        visible={alertVisible}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
        transparent
        testID="modal-remove-customer"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={() => setAlertVisible(false)}
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
            <Pressable
              style={styles.option}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={[styles.optionText, { color: colors.white }]}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={formVisible}
        animationType="fade"
        onRequestClose={() => setFormVisible(false)}
        transparent
        testID="modal-edit-customer"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.formContainer}
          onPress={() => setFormVisible(false)}
        >
          <View style={styles.formContent}>
            <Form
              label="Editar cliente"
              methodType="put"
              data={customerItemMock}
            />
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
    backgroundColor: colors.gray_3,
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
    color: colors.orange,
    fontWeight: "700",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 20,
  },
  formContent: {
    backgroundColor: colors.gray_3,
    width: "100%",
    padding: 20,
    borderRadius: 4,
    position: "absolute",
    alignSelf: "center",
    bottom: "20%",
    zIndex: 1,
  },
});
