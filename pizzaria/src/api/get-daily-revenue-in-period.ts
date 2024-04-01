import { api } from "../lib/axios";

export type GetDailyRevenueInPeriodResponse = {
  date: string;
  revenue: number;
}[];

export interface GetDailyRevenuePeriodQuery {
  from?: Date;
  to?: Date;
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenuePeriodQuery) {
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

  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    "api/metrics/daily-revenue-in-period",
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
      params: {
        from,
        to,
      },
    },
  );

  return response.data;
}
