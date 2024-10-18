import { StyleSheet, Text, View } from "react-native";
import { DrawerSceneWrapper } from "../../components/drawer-scene-wrapper";
import { Header } from "../../components/header";
import { colors } from "../../constants/colors";
import { Button } from "../../components/ui/button";

export default function Customers() {
  return (
    <DrawerSceneWrapper>
      <Header />
      <View style={styles.content}>
        <Text style={styles.textHeader}>Clientes selecionados:</Text>
        <Button title="Limpar clientes selecionados" />
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
