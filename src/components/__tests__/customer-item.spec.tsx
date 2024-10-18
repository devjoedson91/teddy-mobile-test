import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { CustomerItem } from "../customer-item";
import { customerItemMock } from "../__mocks__/customer-item.mock";
import { formatCurrency } from "../../lib/utils";

describe("Customer Item", () => {
  const renderComponent = () => {
    return render(<CustomerItem data={customerItemMock} />);
  };

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

    expect(name?.props.value).toBe(customerItemMock.name);
    expect(salary?.props.value).toBe(formatCurrency(customerItemMock.salary));
    expect(companyValuation?.props.value).toBe(
      formatCurrency(customerItemMock.companyValuation)
    );
  });
});
