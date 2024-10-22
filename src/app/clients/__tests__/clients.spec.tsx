import { ReactNode } from "react";
import { render, waitFor } from "@testing-library/react-native";
import Clients from "..";
import { clientsItemStorageMock } from "../../../components/__mocks__/client-item.mock";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("expo-router/drawer", () => {
  return {
    Drawer: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

jest.mock("../../../components/drawer-scene-wrapper", () => ({
  DrawerSceneWrapper: ({ children }: { children: ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@react-navigation/drawer", () => {
  const actualDrawer = jest.requireActual("@react-navigation/drawer");

  return {
    ...actualDrawer,
    DrawerToggleButton: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

const renderComponent = () => {
  return render(<Clients />);
};

describe("Clients screen", () => {
  async function asyncOperationOnAsyncStorage() {
    await AsyncStorage.setItem(
      "@client.item",
      JSON.stringify(clientsItemStorageMock)
    );

    await AsyncStorage.getItem("@client.item");
  }

  it("should render screen correctly", () => {
    const { getByText, getByRole } = renderComponent();

    expect(getByText("Clientes selecionados:")).toBeVisible();

    expect(
      getByRole("button", { name: /Limpar clientes selecionados/i })
    ).toBeVisible();
  });

  it.skip("should render client items storaged at async storage", async () => {
    await asyncOperationOnAsyncStorage();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("@client.item");

    expect(AsyncStorage.getItem).toHaveLastReturnedWith(
      JSON.stringify(clientsItemStorageMock)
    );

    // expect(AsyncStorage.getItem).toHaveBeenCalledWith("@client.item");
  });
});
