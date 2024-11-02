import "@testing-library/jest-native";
import "react-native-gesture-handler/jestSetup";
import * as ReactQuery from "@tanstack/react-query";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigationState: jest.fn(() => ({})),
  useFocusEffect: jest.fn(),
  useNavigation: () => ({
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  Reanimated.Extrapolation = {
    CLAMP: "clamp",
    EXTEND: "extend",
    IDENTITY: "identity",
  };
  Reanimated.interpolate = jest.fn();
  Reanimated.useAnimatedStyle = jest.fn();
  Reanimated.Animated = {
    createAnimatedComponent: jest.fn((Component) => Component),
  };

  return Reanimated;
});

jest.mock("@react-navigation/drawer", () => ({
  useDrawerProgress: jest.fn().mockReturnValue({ value: 0 }),
}));

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );

  return {
    ...original,
    useQuery: jest.fn(),
  };
});

jest.mock("./src/hooks/useTeddyQueryAPI", () => ({
  useGetClients: jest.fn(),
  useRemoveClient: jest.fn(),
  useClientListStorage: jest.fn(),
  useCreateClient: jest.fn(),
  useUpdateClient: jest.fn(),
  selectClientItem: jest.fn(),
}));
