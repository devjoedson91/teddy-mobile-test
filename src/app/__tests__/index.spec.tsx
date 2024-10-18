import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import Welcome from "..";
import { useRouter } from "expo-router";

describe("Welcome screen", () => {
  const renderComponent = () => {
    return render(<Welcome />);
  };

  const mockName = "Joedson Ferreira";

  it("should show error message when name field are empty", async () => {
    const { getByRole, getByText } = renderComponent();

    const button = getByRole("button", { name: /entrar/i });

    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText(/o nome é obrigatório/i)).toBeVisible();
    });
  });

  it("should type into name field and submit form", () => {
    const { getByPlaceholderText } = renderComponent();

    const nameInput = getByPlaceholderText(/digite o seu nome/i);

    fireEvent.changeText(nameInput, mockName);

    expect(nameInput.props.value).toBe(mockName);
  });

  it("should navigate to the home page when button is pressed", async () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));

    const { getByRole, getByPlaceholderText } = renderComponent();

    const nameInput = getByPlaceholderText(/digite o seu nome/i);

    const button = getByRole("button", { name: /entrar/i });

    await act(() => {
      fireEvent.changeText(nameInput, mockName);
      fireEvent.press(button);
    });

    expect(pushMock).toHaveBeenCalledWith("/home");
  });
});
