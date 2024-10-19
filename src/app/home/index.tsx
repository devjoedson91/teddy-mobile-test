import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants/colors";
import { CustomerItem } from "../../components/customer-item";
import { Header } from "@/src/components/header";
import { DrawerSceneWrapper } from "../../components/drawer-scene-wrapper";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/form";
import { useGetClients } from "@/src/hooks/useTeddyQueryAPI";

export default function Home() {
  const [formVisible, setFormVisible] = useState(false);

  const { data, isError, isFetching } = useGetClients(2);

  return (
    <DrawerSceneWrapper>
      <Header />
      <View style={styles.content}>
        <View>
          <Text style={styles.textHeader}>
            <Text style={{ fontWeight: "bold" }}>{data?.clients.length}</Text>{" "}
            clientes encontrados:
          </Text>
          <Text style={styles.textHeader}>Clientes por página: </Text>
        </View>
        <View style={{ maxHeight: "75%" }}>
          <FlatList
            data={data?.clients}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => <CustomerItem item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <Button title="Criar cliente" onPress={() => setFormVisible(true)} />

        <Modal
          visible={formVisible}
          animationType="fade"
          onRequestClose={() => setFormVisible(false)}
          transparent
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={() => setFormVisible(false)}
          >
            <View style={styles.modalContent}>
              <Form
                label="Criar cliente"
                methodType="post"
                onCloseModal={() => setFormVisible(false)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </DrawerSceneWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 20,
    gap: 20,
  },
  textHeader: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 20,
  },
  modalContent: {
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
