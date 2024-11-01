import { ClientsProps, ClientsQueryRequestProps } from "../../@types";

export const clientItemMock: ClientsProps = {
  id: 73,
  name: "John Doe",
  salary: 5000,
  companyValuation: 500000,
};

export const clientsItemStorageMock: ClientsQueryRequestProps = {
  clients: [
    {
      id: 36,
      name: "Maria",
      salary: 120.01,
      companyValuation: 120.01,
    },
    {
      id: 37,
      name: "Joseane",
      salary: 120.01,
      companyValuation: 120.01,
    },
    {
      id: 73,
      name: "John Doe",
      salary: 5000,
      companyValuation: 500000,
    },
  ],
  currentPage: 1,
  totalPages: 3,
};
