// src/controllers/metricsController.js
import {
  getDayOrdersMetrics,
  getMonthCanceledOrdersAmount,
  getMonthOrdersAmount,
  getMonthReceipt,
} from "../../services/metricsService";

export const getDayOrdersAmount = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    if (!restaurantId) {
      return res
        .status(401)
        .send("User is not associated with any restaurant.");
    }

    const metrics = await getDayOrdersMetrics(restaurantId);

    res.json(metrics);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMonthCanceledOrders = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    if (!restaurantId) {
      return res
        .status(401)
        .send("User is not associated with any restaurant.");
    }

    const metrics = await getMonthCanceledOrdersAmount(restaurantId);

    res.json(metrics);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMonthlyReceipt = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    if (!restaurantId) {
      return res
        .status(401)
        .send("User is not associated with any restaurant.");
    }

    const receiptData = await getMonthReceipt(restaurantId);

    res.json(receiptData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMonthlyOrdersAmount = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    if (!restaurantId) {
      return res
        .status(401)
        .send("User is not associated with any restaurant.");
    }

    const ordersAmountData = await getMonthOrdersAmount(restaurantId);
    console.log(ordersAmountData);
    res.json(ordersAmountData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
