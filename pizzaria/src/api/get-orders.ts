import { api } from "../lib/axios";

export interface GetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export interface GetOrdersResponse {
  orders: {
    id: string;
    created_at: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customer: any;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}
export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersQuery) {
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

  console.log({
    pageIndex,
    orderId,
    customerName,
    status,
  });

  const response = await api.get<GetOrdersResponse>("api/restaurants/orders", {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  console.log(response.data);
  return response.data;
}
