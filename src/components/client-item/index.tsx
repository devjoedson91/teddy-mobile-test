import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { colors } from "../../constants/colors";
import { Pencil, Trash2 } from "lucide-react-native";
import { Form } from "../form";
import { ClientsProps } from "../../@types";
import { formatCurrency } from "../../lib/utils";
import { CheckBox } from "../checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useRemoveClient } from "@/src/hooks/useTeddyQueryAPI";

interface ClientsItemProps {
  item: ClientsProps;
  refetch?: () => void;
}

export function ClientItem({ item, refetch }: ClientsItemProps) {
  const route = useRoute();

  const [alertRemoveVisible, setAlertRemoveVisible] = useState(false);

  const [clientListStorage, setClientlistStorage] = useState<ClientsProps[]>(
    []
  );

  const { mutate } = useRemoveClient(item.id);

  const [formEditVisible, setFormEditVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getClientListStorage();

      return () => {};
    }, [])
  );

  useEffect(() => {
    if (!formEditVisible || !alertRemoveVisible) {
      refetch && refetch();
    }
  }, [formEditVisible, alertRemoveVisible]);

  async function getClientListStorage() {
    const list = await AsyncStorage.getItem("@client.item");

    setClientlistStorage(JSON.parse(list || "[]"));
  }

  function handleRemoveCustomer() {
    mutate();

    setAlertRemoveVisible(false);
  }

  async function handleSelectClientItem() {
    const listStorage = await AsyncStorage.getItem("@client.item");

    const parseList = JSON.parse(listStorage || "[]") as ClientsProps[];

    if (parseList.length) {
      const clientExists = parseList.find(
        (listItem) => listItem.id === item.id
      );

      if (clientExists) {
        const updateList = parseList.filter(
          (clientItem) => clientItem.id !== clientExists.id
        );

        await AsyncStorage.setItem("@client.item", JSON.stringify(updateList));
      } else {
        await AsyncStorage.setItem(
          "@client.item",
          JSON.stringify([...parseList, item])
        );
      }
    } else {
      await AsyncStorage.setItem("@client.item", JSON.stringify([item]));
    }

    getClientListStorage();
  }

  return (
    <View style={styles.containerItem}>
      <View style={styles.customerData}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.valuesText}>{`Salário: ${formatCurrency(
          String(item.salary)
        )}`}</Text>
        <Text style={styles.valuesText}>{`Empresa: ${formatCurrency(
          String(item.companyValuation)
        )}`}</Text>
      </View>
      <View style={styles.controls}>
        <CheckBox
          checked={clientListStorage.some((client) => client.id === item.id)}
          onPress={handleSelectClientItem}
        />
        {route.name !== "clients/index" && (
          <>
            <Pressable
              onPress={() => setFormEditVisible(true)}
              testID="button-edit"
            >
              <Pencil size={24} color={colors.black} />
            </Pressable>
            <Pressable
              onPress={() => setAlertRemoveVisible(true)}
              testID="button-remove"
            >
              <Trash2 size={24} color="red" />
            </Pressable>
          </>
        )}
      </View>

      <Modal
        visible={alertRemoveVisible}
        animationType="fade"
        onRequestClose={() => setAlertRemoveVisible(false)}
        transparent
        testID="modal-remove-customer"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={() => setAlertRemoveVisible(false)}
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
              onPress={() => setAlertRemoveVisible(false)}
            >
              <Text style={[styles.optionText, { color: colors.white }]}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={formEditVisible}
        animationType="fade"
        onRequestClose={() => setFormEditVisible(false)}
        transparent
        testID="modal-edit-customer"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.formContainer}
          onPress={() => setFormEditVisible(false)}
        >
          <View style={styles.formContent}>
            <Form
              label="Editar cliente"
              methodType="patch"
              data={item}
              onCloseModal={() => setFormEditVisible(false)}
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
    height: 140,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 4,
    gap: 8,
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
    padding: 12,
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
