import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./appRoutes";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
