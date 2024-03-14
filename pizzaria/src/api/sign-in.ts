import { api } from "../lib/axios";

export interface SignInBody {
  email: string;
}

export async function signIn({ email }: SignInBody) {
  const url = `/api/users/authenticate/${email}`;
  try {
    const response = await api.get(url);
    return response; // Retorna a resposta para tratamento posterior, se necessário.
  } catch (err) {
    console.error(err);
    throw new Error("Falha na autenticação"); // Lança um erro que será capturado pelo bloco catch de `handleSignIn`.
  }
}
