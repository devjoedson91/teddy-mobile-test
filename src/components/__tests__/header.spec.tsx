import { render } from "@testing-library/react-native";
import { Header } from "../header";

describe("Header", () => {
  it.skip("should render image logo", () => {
    const { getByTestId } = render(<Header />);

    expect(getByTestId("logo")).toBeVisible();
  });
});
