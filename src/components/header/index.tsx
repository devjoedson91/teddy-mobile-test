import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "@/src/constants/colors";
import Feather from "@expo/vector-icons/Feather";

export function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../../assets/images/logo-teddy.png")} />

        <Pressable>
          <Feather name="menu" size={24} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
    height: 70,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
});
