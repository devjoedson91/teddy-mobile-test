import { render } from "@testing-library/react-native";
import { CheckBox } from "../checkbox";

describe("Checkbox component", () => {
  const handleSelectClientItem = jest.fn();
  it("when check property was true", () => {
    const { getByTestId } = render(
      <CheckBox checked onPress={handleSelectClientItem} />
    );

    expect(getByTestId("checked")).toBeVisible();
  });

  it("when check property was false", () => {
    const { getByTestId } = render(
      <CheckBox checked={false} onPress={handleSelectClientItem} />
    );

    expect(getByTestId("unchecked")).toBeVisible();
  });
});
