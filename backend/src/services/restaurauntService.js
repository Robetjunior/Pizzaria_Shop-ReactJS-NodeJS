// Exemplo dentro de src/services/restaurantService.js
import { supabase } from "../config/supabaseClient";
import { formatPhoneNumberToInternational } from "../utils/formatPhoneNumberToInternational";
import { v4 as uuidv4 } from "uuid";

export const fetchRestaurant = async () => {
  const { data, error } = await supabase.from("restaurants").select("*");
  if (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }

  return data;
};

export const createRestaurantWithManager = async ({
  restaurantName,
  managerName,
  email,
  phone,
}) => {
  // Criar um novo usuário gerente
  const formattedPhone = formatPhoneNumberToInternational(phone);

  const id = uuidv4();
  console.log(id);

  const { data: _, error: managerError } = await supabase
    .from("users")
    .insert([
      {
        id: id,
        name: managerName,
        email,
        phone_number: formattedPhone,
        role: "manager",
      },
    ])
    .single();

  if (managerError) {
    return {
      error: true,
      type: "Database Error",
      message: `Erro ao criar o gerente: ${managerError.message}`,
      code: 400, // Exemplo de código HTTP apropriado
    };
  }

  // Criar o restaurante associado ao usuário gerente
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .insert([
      {
        name: restaurantName,
        managerid: id,
      },
    ])
    .single();

  console.log(restaurantError, `tem erro nocadastro da empresa?`);

  if (restaurantError) {
    return { error: restaurantError.message };
  }

  return restaurant;
};
