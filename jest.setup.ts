import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import MockAsyncStorage from "mock-async-storage";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigationState: jest.fn(() => ({})),
  useFocusEffect: jest.fn(),
}));

const mockImpl = new MockAsyncStorage();
jest.mock("@react-native-async-storage/async-storage", () => mockImpl);
