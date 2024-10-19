import { useQuery } from "@tanstack/react-query";
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
    refetchOnWindowFocus: false,
  });

  return query;
}
