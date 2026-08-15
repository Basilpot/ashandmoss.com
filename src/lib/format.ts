export function formatPrice(n: number, currency: string | null | undefined = "NPR"): string {
  const symbol = currency === "USD" ? "$" : "Rs ";
  return `${symbol}${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
