import { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { colors } from "../../constants/colors";
import { ClientItem } from "../../components/client-item";
import { Header } from "@/src/components/header";
import { DrawerSceneWrapper } from "../../components/drawer-scene-wrapper";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/form";
import { useGetClients } from "@/src/hooks/useTeddyQueryAPI";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const [formVisible, setFormVisible] = useState(false);

  const [limitPerPage, setLimitPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch } = useGetClients(currentPage, limitPerPage);

  useFocusEffect(
    useCallback(() => {
      refetch();

      return () => {};
    }, [])
  );

  useEffect(() => {
    !formVisible && refetch();
  }, [formVisible]);

  return (
    <DrawerSceneWrapper>
      <Header />
      <View style={styles.content}>
        <View style={styles.infoPagesContent}>
          <Text style={styles.textHeader}>
            <Text style={{ fontWeight: "bold" }}>{data?.clients.length}</Text>{" "}
            clientes encontrados:
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textHeader}>Clientes por página: </Text>
            <TextInput
              style={styles.limitInput}
              keyboardType="numeric"
              maxLength={2}
              value={String(limitPerPage)}
              onChangeText={(value) => {
                setLimitPerPage(Number(value));

                refetch();
              }}
            />
          </View>
        </View>
        <View style={{ maxHeight: "60%" }}>
          <FlatList
            data={data?.clients}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => (
              <ClientItem item={item} refetch={refetch} />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <Button title="Criar cliente" onPress={() => setFormVisible(true)} />

        <View style={styles.pagination}>
          <FlatList
            data={Array.from({ length: data?.totalPages! })}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setCurrentPage(index + 1);

                  refetch();
                }}
              >
                <Text
                  key={index}
                  style={[
                    styles.paginationText,
                    currentPage === index + 1 && {
                      backgroundColor: colors.orange,
                      borderWidth: 0,
                      color: colors.white,
                    },
                  ]}
                >
                  {index + 1}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Modal
          visible={formVisible}
          animationType="fade"
          onRequestClose={() => refetch()}
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
    gap: 30,
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
  limitInput: {
    borderWidth: 1,
    borderColor: colors.gray_1,
    borderRadius: 4,
    width: 30,
    paddingHorizontal: 6,
    fontSize: 18,
  },
  infoPagesContent: {
    alignSelf: "center",
    gap: 8,
  },
  pagination: {
    alignSelf: "center",
  },
  paginationText: {
    fontSize: 16,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray_1,
  },
});
