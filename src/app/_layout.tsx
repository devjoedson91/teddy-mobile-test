import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import QueryProvider from "../providers/query-provider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <GestureHandlerRootView>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: colors.orange,
            drawerInactiveTintColor: colors.white,
            drawerActiveBackgroundColor: "transparent",
            drawerInactiveBackgroundColor: "transparent",
            drawerHideStatusBarOnOpen: true,
            overlayColor: "transparent",
            drawerStyle: {
              paddingTop: 32,
              width: "50%",
              backgroundColor: colors.modalBackground,
            },
            drawerLabelStyle: {
              marginLeft: -16,
            },
            sceneContainerStyle: {
              backgroundColor: colors.modalBackground,
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerItemStyle: {
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            name="home/index"
            options={{
              drawerLabel: "Home",
              drawerIcon: ({ color }) => (
                <Entypo name="home" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="clients/index"
            options={{
              drawerLabel: "Clientes",
              drawerIcon: ({ color }) => (
                <FontAwesome name="user" size={20} color={color} />
              ),
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </QueryProvider>
  );
}
