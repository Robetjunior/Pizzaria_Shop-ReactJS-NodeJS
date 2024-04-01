import { api } from "../lib/axios";

interface UpdateProfileBody {
  name: string;
  description: string | null;
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
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

  await api.put(
    "/api/restaurants/profile",
    { name, description },
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );
}
