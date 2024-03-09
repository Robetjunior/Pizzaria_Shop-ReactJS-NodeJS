// Exemplo dentro de src/services/clienteService.js
import { supabase } from "../config/supabaseClient";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "../utils/validationUtils";
export const fetchUsers = async () => {
  console.log("entrou no fetchUsers");
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return null;
  }

  return data;
};

export async function adicionarCliente(user) {
  if (
    !isValidName(user.name) ||
    !isValidEmail(user.email) ||
    !isValidPhoneNumber(user.phone_number)
  ) {
    return {
      error:
        "Verifique se todos os campos estão corretos e preenchidos: Nome, Email e Telefone no formato +55DD99999-9999.",
    };
  }

  const { data, error } = await supabase
    .from("users")
    .insert([
      { name: user.name, email: user.email, phone_number: user.phone_number },
    ]);

  if (error) {
    console.error("Erro ao adicionar cliente:", error);
    return { error };
  }

  return data;
}
