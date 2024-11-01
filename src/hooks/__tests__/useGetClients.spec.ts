import { clientsItemStorageMock } from "../../components/__mocks__/client-item.mock";
import api from "../../services/api";
describe("useGetClients", () => {
  beforeAll(() => {
    jest.spyOn(api, "get").mockResolvedValue({ data: clientsItemStorageMock });
  });

  it("verifies if api mock results to be called correctly", async () => {
    const spyFn = jest
      .spyOn(api, "get")
      .mockResolvedValueOnce({ data: clientsItemStorageMock });

    const clients = await api.get(`/users?page=${1}&limit=${3}`);

    expect(spyFn).toHaveBeenCalledTimes(1);

    expect(clients.data.clients.length).toBe(3);
  });

  it("API should return client list", async () => {
    const response = await api.get(`/users?page=${1}&limit=${3}`);

    const clientList = response.data.clients;

    expect(clientList).toEqual(clientsItemStorageMock.clients);
  });
});
