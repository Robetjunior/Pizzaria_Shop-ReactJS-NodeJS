// Import supabase client
import { supabase } from "../../config/supabaseClient";
import {
  getManagedRestaurantService,
  createRestaurantWithManager,
  fetchRestaurant,
  updateProfileService,
  getOrderDetailsService,
  cancelOrderService,
  approveOrderService,
  deliverOrderService,
  dispatchOrderService,
} from "../../services/restaurauntService";

export const getOrders = async (req, res) => {
  try {
    const { pageIndex, orderId, customerName, status } = req.query;
    const restaurantId = req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(401).send("User is not a restaurant manager.");
    }

    // Start the count query to calculate total number of orders based on filters
    let query = supabase
      .from("orders")
      .select(`id, created_at, status, total, customer:users(name)`)
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    // Aplica filtros que podem ser feitos diretamente na consulta
    if (orderId) {
      query = query.ilike("id", `%${orderId}%`);
    }
    if (status) {
      query = query.eq("status", status);
    }

    // Executa a consulta sem paginação para aplicar o filtro de nome do cliente posteriormente
    const { data: orders, error } = await query;

    if (error) {
      throw error;
    }

    // Aplica o filtro de nome do cliente
    let filteredOrders = customerName
      ? orders.filter(
          (order) =>
            order.customer &&
            order.customer.name
              .toLowerCase()
              .includes(customerName.toLowerCase())
        )
      : orders;

    // Calcula a quantidade total de registros após os filtros
    const totalCount = filteredOrders.length;

    // Aplica a paginação manualmente
    filteredOrders = filteredOrders.slice(pageIndex * 10, (pageIndex + 1) * 10);

    res.json({
      orders: filteredOrders,
      meta: {
        pageIndex: parseInt(pageIndex, 10),
        perPage: 10,
        totalCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const restaurantId = req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(401).send({ error: "Not a manager." });
    }

    const order = await getOrderDetailsService(orderId, restaurantId);

    if (!order) {
      return res.status(404).send({ error: "Order not found." });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const result = await cancelOrderService({ orderId });
    if (result.error) {
      throw new Error(result.message);
    }
    res.status(200).json({ message: "Pedido cancelado com sucesso." });
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    res.status(500).send(error.message);
  }
};

export const approveOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const result = await approveOrderService({ orderId });
    if (result.error) {
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({ message: "Pedido aprovado com sucesso." });
  } catch (error) {
    console.error("Erro ao aprovar pedido:", error);
    res.status(500).send(error.message);
  }
};

export const deliverOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const result = await deliverOrderService({ orderId });
    if (result.error) {
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({ message: "Pedido entregue com sucesso." });
  } catch (error) {
    console.error("Erro ao entregar pedido:", error);
    res.status(500).send(error.message);
  }
};

export const dispatchOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const result = await dispatchOrderService({ orderId });
    if (result.error) {
      return res.status(400).json({ message: result.message });
    }
    console.log(`pedido enviado ao cliente com sucesso`);
    res.status(200).json({ message: "Pedido enviado ao cliente com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar pedido ao cliente:", error);
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
