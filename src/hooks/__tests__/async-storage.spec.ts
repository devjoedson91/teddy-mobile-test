import { clientsItemStorageMock } from "../../components/__mocks__/client-item.mock";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useClientListStorage } from "../useTeddyQueryAPI";

jest.mock("../useTeddyQueryAPI", () => ({
  useClientListStorage: jest.fn(),
}));

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("Async storage", () => {
  it("if no results exist at key, return an empty array", async () => {
    (useClientListStorage as jest.Mock).mockResolvedValueOnce([]);

    const result = await useClientListStorage();

    expect(result).toEqual([]);
  });

  it("should call AsyncStorage.getItem with the correct key", async () => {
    const getItemSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(clientsItemStorageMock.clients));

    const storage = await AsyncStorage.getItem("@client.item");

    expect(getItemSpy).toHaveBeenCalledWith("@client.item");

    expect(storage).toBe(JSON.stringify(clientsItemStorageMock.clients));

    getItemSpy.mockRestore();
  });
});
