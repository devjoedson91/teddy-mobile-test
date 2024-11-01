import { ReactNode } from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { ClientItem } from "../client-item";
import {
  clientItemMock,
  clientsItemStorageMock,
} from "../__mocks__/client-item.mock";
import { formatCurrency } from "../../lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useClientListStorage,
  useGetClients,
  useRemoveClient,
} from "../../hooks/useTeddyQueryAPI";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const renderComponent = () => {
  return render(<ClientItem item={clientItemMock} />, { wrapper });
};

describe("Client Item", () => {
  beforeEach(() => {
    (useGetClients as jest.Mock).mockImplementation(() => ({
      data: clientsItemStorageMock,
      isLoading: false,
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      getClientListStorage: jest.fn(),
    }));

    (useRemoveClient as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render modal delete user", async () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonRemove = getByTestId("button-remove");

    const modal = queryByTestId("modal-remove-customer");

    expect(modal).toBeNull();

    await act(() => fireEvent.press(buttonRemove));

    expect(buttonRemove).toBeTruthy();
  });

  it("should render modal edit user", async () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonEdit = getByTestId("button-edit");

    const modal = queryByTestId("modal-edit-customer");

    expect(modal).toBeNull();

    await act(() => fireEvent.press(buttonEdit));

    expect(buttonEdit).toBeTruthy();
  });

  it("should show values in the fields for editing", async () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonEdit = getByTestId("button-edit");

    await act(() => fireEvent.press(buttonEdit));

    const name = queryByTestId("name");
    const salary = queryByTestId("salary");
    const companyValuation = queryByTestId("companyValuation");

    expect(name?.props.value).toBe(clientItemMock.name);
    expect(salary?.props.value).toBe(
      formatCurrency(String(clientItemMock.salary))
    );
    expect(companyValuation?.props.value).toBe(
      formatCurrency(String(clientItemMock.companyValuation))
    );
  });

  it("should change check status of the checkbox when it be clicked", async () => {
    (useClientListStorage as jest.Mock).mockResolvedValueOnce(() => ({
      data: clientsItemStorageMock.clients,
      refetch: jest.fn(),
    }));

    const { findByTestId, queryByTestId, debug } = renderComponent();

    const checkbox = await findByTestId("check-box");

    fireEvent.press(checkbox);

    const itemChecked = await findByTestId("checked");

    debug();

    // const itemChecked = queryByTestId("checked");

    // console.log(itemChecked);

    // expect(itemChecked).toBeVisible();
  });
});
