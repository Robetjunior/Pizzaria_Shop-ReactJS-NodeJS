import { api } from "../lib/axios";

export interface SignInBody {
  email: string;
}

export async function signIn({ email }: SignInBody) {
  const url = `/api/users/authenticate/${email}`;
  console.log(`Requesting URL: ${url}`); // This will log the full URL
  await api.get(url);
}
