export interface ClientsProps {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ClientsQueryRequestProps {
  clients: ClientsProps[];
  totalPages: number;
  currentPage: number;
}
