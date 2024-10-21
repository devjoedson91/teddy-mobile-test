import { render } from "@testing-library/react-native";
import { Header } from "../header";

jest.mock("@react-navigation/drawer", () => {
  const actualDrawer = jest.requireActual("@react-navigation/drawer");

  return {
    ...actualDrawer,
    DrawerToggleButton: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

describe("Header", () => {
  it("should render image logo", () => {
    const { getByTestId } = render(<Header />);

    const logo = getByTestId("logo");

    expect(logo).toBeVisible();

    expect(logo.props.source).toEqual({
      testUri: "../../../assets/images/logo-teddy.png",
    });
  });
});
