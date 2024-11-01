import { useQuery, useMutation } from "@tanstack/react-query";
import { ClientsProps, ClientsQueryRequestProps } from "../@types";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useGetClients(page: number, limit: number) {
  const query = useQuery({
    queryFn: async (): Promise<ClientsQueryRequestProps> => {
      const response = await api.get<ClientsQueryRequestProps>(
        `/users?page=${page}&limit=${limit}`
      );

      return response.data;
    },
    queryKey: ["get-clients"],
  });

  return query;
}

export function useClientListStorage() {
  const query = useQuery({
    queryFn: async (): Promise<ClientsProps[]> => {
      const list = await AsyncStorage.getItem("@client.item");

      if (list) {
        return JSON.parse(list);
      }

      return [];
    },
    queryKey: ["clients-list-storage"],
  });

  return query;
}

export function useCreateClient() {
  async function handleSubmit(data: Omit<ClientsProps, "id">) {
    return await api.post("/users", data);
  }

  const createClient = useMutation({
    mutationFn: handleSubmit,
    mutationKey: ["create-client"],
  });

  return createClient;
}

export function useUpdateClient(id?: number) {
  async function handleSubmit(data: Omit<ClientsProps, "id">) {
    if (!id) return;

    return await api.patch(`/users/${id}`, data);
  }

  const updateClient = useMutation({
    mutationFn: handleSubmit,
    mutationKey: ["update-client"],
  });

  return updateClient;
}

export function useRemoveClient(id?: number) {
  async function handleRemoveClient() {
    if (!id) return;

    return await api.delete(`/users/${id}`);
  }

  const remove = useMutation({
    mutationFn: handleRemoveClient,
    mutationKey: ["remove-client"],
  });

  return remove;
}

export async function selectClientItem(item: ClientsProps) {
  const listStorage = await AsyncStorage.getItem("@client.item");

  const parseList = JSON.parse(listStorage || "[]") as ClientsProps[];

  if (parseList.length) {
    const clientExists = parseList.find((listItem) => listItem.id === item.id);

    if (clientExists) {
      const updateList = parseList.filter(
        (clientItem) => clientItem.id !== clientExists.id
      );

      await AsyncStorage.setItem("@client.item", JSON.stringify(updateList));
    } else {
      await AsyncStorage.setItem(
        "@client.item",
        JSON.stringify([...parseList, item])
      );
    }
  } else {
    await AsyncStorage.setItem("@client.item", JSON.stringify([item]));
  }

  useClientListStorage().refetch();
}
