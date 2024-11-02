import { ReactNode } from "react";
import { render } from "test-utils";
import Clients from "..";
import { clientsItemStorageMock } from "../../../components/__mocks__/client-item.mock";
import {
  useClientListStorage,
  useRemoveClient,
} from "../../../hooks/useTeddyQueryAPI";

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
    DrawerToggleButton: ({ children }: { children: ReactNode }) => (
      <>{children}</>
    ),
  };
});

jest.mock("../../../hooks/useTeddyQueryAPI", () => ({
  useClientListStorage: jest.fn(),
  useRemoveClient: jest.fn(),
}));

const renderComponent = () => render(<Clients />);

describe("Clients screen", () => {
  beforeAll(() => {
    (useRemoveClient as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));

    (useClientListStorage as jest.Mock).mockResolvedValue(() => ({
      data: clientsItemStorageMock.clients,
      refetch: jest.fn(),
    }));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render screen correctly", () => {
    const { getByText, getByRole } = renderComponent();

    expect(getByText("Clientes selecionados:")).toBeVisible();

    expect(
      getByRole("button", { name: /Limpar clientes selecionados/i })
    ).toBeVisible();
  });

  it("should render client items storaged at async storage", async () => {
    (useClientListStorage as jest.Mock).mockImplementationOnce(() => ({
      data: clientsItemStorageMock.clients,
      refetch: jest.fn(),
    }));

    const { findByText, queryByText } = renderComponent();

    const itemName1 = await findByText("Maria");
    const itemName2 = queryByText("Joseane");

    expect(itemName1).toBeTruthy();
    expect(itemName2).toBeTruthy();
  });
});
