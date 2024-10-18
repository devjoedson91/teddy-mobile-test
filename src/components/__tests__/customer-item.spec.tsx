import { fireEvent, render } from "@testing-library/react-native";
import { CustomerItem } from "../customer-item";
import { customerItemMock } from "../__mocks__/customer-item.mock";

describe("Customer Item", () => {
  const renderComponent = () => {
    return render(<CustomerItem data={customerItemMock} />);
  };

  it("should render modal delete user", () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonRemove = getByTestId("button-remove");

    const modal = queryByTestId("modal-remove-customer");

    expect(modal).toBeNull();

    fireEvent.press(buttonRemove);

    expect(buttonRemove).toBeTruthy();
  });

  it("should render modal edit user", () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonEdit = getByTestId("button-edit");

    const modal = queryByTestId("modal-edit-customer");

    expect(modal).toBeNull();

    fireEvent.press(buttonEdit);

    expect(buttonEdit).toBeTruthy();
  });
});
