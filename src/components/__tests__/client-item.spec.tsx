import { act, fireEvent, render } from "@testing-library/react-native";
import { ClientItem } from "../client-item";
import { clientItemMock } from "../__mocks__/client-item.mock";
import { formatCurrency } from "../../lib/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Customer Item", () => {
  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ClientItem item={clientItemMock} />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    AsyncStorage.clear();
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
});
