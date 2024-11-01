import { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { DrawerSceneWrapper } from "../../components/drawer-scene-wrapper";
import { Header } from "../../components/header";
import { colors } from "../../constants/colors";
import { Button } from "../../components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClientsProps } from "../../@types";
import { ClientItem } from "../../components/client-item";
import { useFocusEffect } from "@react-navigation/native";
import { useClientListStorage } from "../../hooks/useTeddyQueryAPI";

export default function Clients() {
  useFocusEffect(
    useCallback(() => {
      refetch();

      return () => {};
    }, [])
  );

  const { data: clientList, refetch } = useClientListStorage();

  async function handleRemoveClietListStorage() {
    const listStorage = await AsyncStorage.getItem("@client.item");

    const selectedItems = JSON.parse(listStorage || "[]") as ClientsProps[];

    const tempList = clientList;

    const updatedList = tempList?.filter((item) => {
      return !selectedItems.some((selected) => selected.id === item.id);
    });

    await AsyncStorage.setItem("@client.item", JSON.stringify(updatedList));

    refetch();
  }

  return (
    <DrawerSceneWrapper>
      <Header />
      <View style={styles.content}>
        <Text style={styles.textHeader}>Clientes selecionados:</Text>

        <View style={{ maxHeight: "60%" }}>
          <FlatList
            data={clientList}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => <ClientItem item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            testID="client-list"
          />
        </View>

        <Button
          title="Limpar clientes selecionados"
          onPress={handleRemoveClietListStorage}
        />
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
    fontWeight: "700",
  },
});
