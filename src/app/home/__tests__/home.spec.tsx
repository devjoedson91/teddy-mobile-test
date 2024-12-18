import { ReactNode } from "react";
import { render, waitFor } from "test-utils";
import Home from "..";
import {
  useClientListStorage,
  useGetClients,
  useRemoveClient,
} from "../../../hooks/useTeddyQueryAPI";
import { clientsItemStorageMock } from "../../../components/__mocks__/client-item.mock";

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

const renderComponent = () => render(<Home />);

describe("<Home />", () => {
  beforeAll(() => {
    (useGetClients as jest.Mock).mockImplementation(() => ({
      data: clientsItemStorageMock,
      isLoading: false,
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      refetch: jest.fn(),
    }));

    (useClientListStorage as jest.Mock).mockResolvedValue(() => ({
      data: clientsItemStorageMock.clients,
      refetch: jest.fn(),
    }));

    (useRemoveClient as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render client items mocked", async () => {
    const { queryByText, findByText, debug } = renderComponent();

    const itemName1 = await findByText(/maria/i);
    const itemName2 = queryByText(/joseane/i);

    expect(itemName1).toBeVisible();
    expect(itemName2).toBeVisible();
  });

  it("should render amount client items per page", async () => {
    const { queryAllByTestId } = renderComponent();

    await waitFor(() => {
      const itemsPerPage = queryAllByTestId("client-item");

      expect(itemsPerPage.length).toBe(3);
    });
  });
});
