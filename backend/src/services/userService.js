// Exemplo dentro de src/services/clienteService.js
import { supabase } from "../config/supabaseClient";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "../utils/validationUtils";

export const fetchUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return null;
  }

  return data;
};

export const getUserById = async (id) => {
  const users = await fetchUsers();
  return users.find((user) => user.id === id);
};

export const getUserByPhoneNumber = async (phoneNumber) => {
  const users = await fetchUsers();
  return users.find((user) => user.phone_number === phoneNumber);
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
      {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        x_coordinate: user.x_coordinate,
        y_coordinate: user.y_coordinate,
      },
    ]);

  if (error) {
    console.error("Erro ao adicionar cliente:", error);
    return { error };
  }

  return data;
}
