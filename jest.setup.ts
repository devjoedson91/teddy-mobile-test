import "@testing-library/jest-native";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));
