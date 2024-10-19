import { useQuery, useMutation } from "@tanstack/react-query";
import { ClientsProps, ClientsQueryRequestProps } from "../@types";
import api from "../services/api";

export function useGetClients(page: number, limit: number = 10) {
  const query = useQuery({
    queryFn: async (): Promise<ClientsQueryRequestProps> => {
      const response = await api.get<ClientsQueryRequestProps>(
        `/users?page=${page}&limit=${limit}`
      );

      return response.data;
    },
    queryKey: ["get-clients"],
    refetchOnWindowFocus: true,
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
