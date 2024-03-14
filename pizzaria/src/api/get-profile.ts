import { api } from "../lib/axios";

interface GetProfileResponse {
  name: string;
  id: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile() {
  const hash = window.location.hash;
  const urlParams = new URLSearchParams(hash.substring(hash.indexOf("?") + 1));
  const token = urlParams.get("token");

  if (token) {
    console.log("Token encontrado: ", token);
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

  const response = await api.get<GetProfileResponse>("api/users/auth/me", {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  return response.data;
}
