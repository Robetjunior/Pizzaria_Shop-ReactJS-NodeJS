import { api } from "../lib/axios";

export async function signOut() {
  const storedToken = localStorage.getItem("authToken");

  if (!storedToken) {
    console.error("Nenhum token armazenado encontrado.");
    return null; // Ou handle de forma adequada
  }

  console.log("vai chamar a função");

  await api.post(
    "/api/sign-out/sign-out",
    {},
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  );
}
