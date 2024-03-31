import { api } from "../lib/axios";

export interface GetMonthCanceldOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceldOrdersAmount() {
  const hash = window.location.hash;
  const urlParams = new URLSearchParams(hash.substring(hash.indexOf("?") + 1));
  const token = urlParams.get("token");

  if (token) {
    localStorage.setItem("authToken", token);
    window.history.pushState(null, "", "/"); // Limpa a URL após armazenar o token
  } else {
    console.log("Token não encontrado na URL.");
  }

  const storedToken = localStorage.getItem("authToken");

  if (!storedToken) {
    console.error("Nenhum token armazenado encontrado.");
    return null; // Ou handle de forma adequada
  }

  const response = await api.get<GetMonthCanceldOrdersAmountResponse>(
    "api/metrics/month-canceled-orders-amount",
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );

  return response.data;
}
