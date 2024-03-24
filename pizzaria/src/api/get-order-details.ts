import { api } from "../lib/axios";

export interface GetOrderDetailsParams {
  orderId: string;
}

export interface GetOrderDetailsResponse {
  id: string;
  createAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItens: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
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

  const response = await api.get<GetOrderDetailsResponse>(
    `/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );

  return response.data;
}
