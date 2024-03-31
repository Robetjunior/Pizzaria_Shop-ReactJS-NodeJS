import { api } from "../lib/axios";

export interface GetMonthRevenuetResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
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
  const response = await api.get<GetMonthRevenuetResponse>(
    "api/metrics/month-revenue",
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );

  console.log("deu certo?", response.data);

  return response.data;
}