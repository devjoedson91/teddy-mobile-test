import { fireEvent, render } from "@testing-library/react-native";
import { CustomerItem } from "../customer-item";

describe("Customer Item", () => {
  const renderComponent = () => {
    return render(<CustomerItem />);
  };

  it("should render modal delete user", () => {
    const { getByTestId, queryByTestId } = renderComponent();

    const buttonRemove = getByTestId("button-remove");

    const modal = queryByTestId("modal-remove-customer");

    expect(modal).toBeNull();

    fireEvent.press(buttonRemove);

    expect(buttonRemove).toBeTruthy();
  });
});
