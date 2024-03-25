// Exemplo dentro de src/services/restaurantService.js
import { supabase } from "../config/supabaseClient";
import { formatPhoneNumberToInternational } from "../utils/formatPhoneNumberToInternational";
import { v4 as uuidv4 } from "uuid";
import { generateOrderItems } from "../utils/generateOrderItems";

export const fetchRestaurant = async () => {
  const { data, error } = await supabase.from("restaurants").select("*");
  if (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }

  return data;
};

export const cancelOrderService = async ({ orderId }) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "canceled" })
    .match({ id: orderId })
    .single();

  if (error) {
    console.error("Erro ao cancelar pedido no banco de dados:", error);
    return { error: true, message: error.message };
  }

  return { error: false, data };
};

export const approveOrderService = async ({ orderId }) => {
  const { data: order, error } = await supabase
    .from("orders")
    .update({ status: "processing" })
    .match({ id: orderId, status: "pending" })
    .single();

  if (error) {
    console.error("Erro ao aprovar pedido no banco de dados:", error);
    return { error: true, message: error.message };
  }

  return { error: false };
};

export const deliverOrderService = async ({ orderId }) => {
  const { data: order, error } = await supabase
    .from("orders")
    .update({ status: "delivered" })
    .match({ id: orderId, status: "delivering" })
    .single();

  if (error) {
    console.error("Erro ao entregar pedido no banco de dados:", error);
    return { error: true, message: error.message };
  }

  return { error: false };
};

export const dispatchOrderService = async ({ orderId }) => {
  const { data: order, error } = await supabase
    .from("orders")
    .update({ status: "delivering" })
    .match({ id: orderId, status: "processing" })
    .single();

  if (error) {
    console.error("Erro ao enviar pedido ao cliente no banco de dados:", error);
    return { error: true, message: error.message };
  }

  return { error: false };
};

export const getOrderDetailsService = async (orderId, restaurantId) => {
  try {
    const { data, error } = await supabase.rpc("fetch_order_details", {
      order_id_param: orderId,
      restaurant_id_param: restaurantId,
    });

    if (error) {
      console.error("Failed to fetch order details:", error);
      throw new Error("Failed to fetch order details");
    }

    if (!data || data.length === 0) {
      throw new Error("No data found");
    }

    const orderDetails = data[0];

    // Exemplo de como você poderia gerar os orderItems fictícios
    const generatedOrderItems = generateOrderItems(orderDetails.totalincents);

    // Incorpora os itens fictícios no detalhe do pedido
    const transformedOrderDetails = {
      id: orderDetails.id,
      created_at: orderDetails.created_at,
      status: orderDetails.status,
      totalInCents: orderDetails.totalincents,
      customer: {
        name: orderDetails.customername,
        email: orderDetails.customeremail,
        phone_number: orderDetails.customerphonenumber,
      },
      orderItems: generatedOrderItems,
    };

    return transformedOrderDetails;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw new Error("An error occurred while fetching order details");
  }
};

export const getManagedRestaurantService = async (managedId) => {
  const { data: managedRestaurant, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("managerid", managedId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }

  return managedRestaurant;
};

export const updateProfileService = async ({ id, name, description }) => {
  // Primeiro, buscamos o restaurante gerenciado pelo managerid fornecido
  const { data: managedRestaurant, error: fetchError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("managerid", id)
    .maybeSingle();

  // Se houver erro na busca, logamos o erro e retornamos null
  if (fetchError) {
    console.error("Error fetching restaurant:", fetchError);
    return null;
  }

  // Se o restaurante for encontrado, atualizamos o nome e a descrição
  if (managedRestaurant) {
    const { error: updateError } = await supabase
      .from("restaurants")
      .update({ name, description })
      .eq("managerid", id);

    // Se houver erro na atualização, logamos o erro e retornamos null
    if (updateError) {
      console.error("Error updating restaurant:", updateError);
      return null;
    }

    // Retornamos o restaurante atualizado
    return { ...managedRestaurant, name, description };
  } else {
    console.log("No restaurant found for the given managerid.");
    return null;
  }
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

  if (restaurantError) {
    return { error: restaurantError.message };
  }

  return restaurant;
};
