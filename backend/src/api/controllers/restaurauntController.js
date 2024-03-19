// Import supabase client
import { supabase } from "../../config/supabaseClient";
import {
  getManagedRestaurantService,
  createRestaurantWithManager,
  fetchRestaurant,
  updateProfileService,
} from "../../services/restaurauntService";

export const getOrders = async (req, res) => {
  try {
    const { pageIndex = 0, orderId, customerName, status } = req.query;
    const restaurantId = req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(401).send("User is not a restaurant manager.");
    }

    let query = supabase
      .from("orders")
      .select(
        `
        id, 
        created_at, 
        status, 
        total,
        customer:users(name) // Ajuste baseado na suposição de que você tenha uma relação configurada
      `
      )
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (orderId) {
      query = query.ilike("id", `%${orderId}%`);
    }
    if (customerName) {
      // Atualize para refletir a lógica correta de filtrar por nome do cliente,
      // isso pode exigir ajustes se a suposição sobre a relação estiver incorreta.
    }
    if (status) {
      query = query.eq("status", status);
    }

    const from = pageIndex * 10;
    const to = (pageIndex + 1) * 10 - 1;
    query = query.range(from, to);

    const { data: orders, error, count } = await query;

    if (error) {
      throw error;
    }

    res.json({
      orders,
      meta: {
        pageIndex: parseInt(pageIndex, 10),
        perPage: 10,
        totalCount: count,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const users = await fetchRestaurant();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getManagedRestaurant = async (req, res) => {
  try {
    const userId = req.user.id;
    const managerRestaurant = await getManagedRestaurantService(userId);
    res.json(managerRestaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.user.id;

    await updateProfileService({
      id,
      name,
      description,
    });

    res.status(201).json({ message: `atualização efetuado com sucesso!` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const { restaurantName, managerName, email, phone } = req.body;

    await createRestaurantWithManager({
      restaurantName,
      managerName,
      email,
      phone,
    });

    res.status(201).json({ message: `cadastro efetuado com sucesso!` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
