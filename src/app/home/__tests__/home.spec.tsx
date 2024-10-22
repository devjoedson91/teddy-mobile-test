import { ReactNode } from "react";
import { render, renderHook, waitFor } from "@testing-library/react-native";
import Home from "..";
import * as ReactQuery from "@tanstack/react-query";
import {
  useGetClients,
  useRemoveClient,
} from "../../../hooks/useTeddyQueryAPI";
import { clientsItemStorageMock } from "../../../components/__mocks__/client-item.mock";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock(
  "@react-native-async-storage/async-storage/jest/async-storage-mock",
  () => ({
    getItem: jest.fn(),
  })
);

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

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );

  return {
    ...original,
    useQuery: jest.fn(),
  };
});

jest.mock("../../../hooks/useTeddyQueryAPI", () => ({
  useGetClients: jest.fn(),
  useRemoveClient: jest.fn(),
}));

const queryClient = new ReactQuery.QueryClient();

const renderComponent = () =>
  render(
    <ReactQuery.QueryClientProvider client={queryClient}>
      <Home />
    </ReactQuery.QueryClientProvider>
  );

const wrapper = ({ children }: { children: ReactNode }) => (
  <ReactQuery.QueryClientProvider client={queryClient}>
    {children}
  </ReactQuery.QueryClientProvider>
);

describe("<Home />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render client items mocked", async () => {
    const dataResultMock = {
      clients: clientsItemStorageMock,
    };

    (useGetClients as jest.Mock).mockImplementation(() => ({
      data: dataResultMock,
      isLoading: false,
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      refetch: jest.fn(),
    }));

    (useRemoveClient as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));

    const { result } = renderHook(() => useGetClients(1, 5), { wrapper });

    await waitFor(() => result.current);

    const { queryByText } = renderComponent();

    const name1 = queryByText(/maria/i);
    const name2 = queryByText(/joseane/i);
    const name3 = queryByText(/laercio/i);

    expect(name1).toBeVisible();
    expect(name2).toBeVisible();
    expect(name3).toBeVisible();
  });
});
