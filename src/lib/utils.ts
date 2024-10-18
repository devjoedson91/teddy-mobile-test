export function formatCurrency(value: string) {
  if (!value) return "";

  return (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
