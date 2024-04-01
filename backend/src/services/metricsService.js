// src/services/metricsService.js
import { supabase } from "../config/supabaseClient";
import dayjs from "dayjs";

export const getDayOrdersMetrics = async (restaurantId) => {
  try {
    const today = dayjs();
    const yesterday = today.subtract(1, "day").format("YYYY-MM-DD");
    const todayStr = today.format("YYYY-MM-DD");

    // Fetch orders for today and yesterday
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id, created_at")
      .gte("created_at", yesterday + "T00:00:00.000Z")
      .lte("created_at", todayStr + "T23:59:59.999Z")
      .eq("restaurant_id", restaurantId);

    if (error) throw new Error(error.message);

    const ordersToday = orders.filter(
      (order) => dayjs(order.created_at).format("YYYY-MM-DD") === todayStr
    ).length;
    const ordersYesterday = orders.length - ordersToday;

    let diffFromYesterday = 0;
    if (ordersYesterday > 0) {
      diffFromYesterday =
        ((ordersToday - ordersYesterday) / ordersYesterday) * 100;
    }

    return {
      amount: ordersToday,
      diffFromYesterday: diffFromYesterday.toFixed(2),
    };
  } catch (error) {
    console.error("Error fetching day orders metrics:", error);
    throw error;
  }
};

export const getMonthCanceledOrdersAmount = async (restaurantId) => {
  try {
    const today = dayjs();
    const startOfCurrentMonth = today.startOf("month").format("YYYY-MM-DD");
    const startOfLastMonth = today
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfLastMonth = today
      .startOf("month")
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    // Fetch canceled orders from the start of last month to today
    const { data: orders, error } = await supabase
      .from("orders")
      .select("created_at")
      .gte("created_at", startOfLastMonth)
      .lte("created_at", today.format("YYYY-MM-DD"))
      .eq("status", "canceled")
      .eq("restaurant_id", restaurantId);

    if (error) throw new Error(error.message);

    // Filter orders for the current and last month
    const ordersLastMonth = orders.filter(
      (order) => order.created_at <= endOfLastMonth
    ).length;
    const ordersCurrentMonth = orders.filter(
      (order) => order.created_at >= startOfCurrentMonth
    ).length;

    // Calculate the difference
    let diffFromLastMonth =
      ordersLastMonth > 0
        ? ((ordersCurrentMonth - ordersLastMonth) / ordersLastMonth) * 100
        : null;

    return {
      amount: ordersCurrentMonth,
      diffFromLastMonth: diffFromLastMonth ? diffFromLastMonth.toFixed(2) : 0,
    };
  } catch (error) {
    console.error("Error fetching month canceled orders amount:", error);
    throw error;
  }
};

export const getMonthReceipt = async (restaurantId) => {
  try {
    const today = dayjs();
    const startOfCurrentMonth = today.startOf("month").format("YYYY-MM-DD");
    const startOfLastMonth = today
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

    // Fetch all orders from the start of last month to today
    const { data: orders, error } = await supabase
      .from("orders")
      .select("total, created_at")
      .gte("created_at", startOfLastMonth)
      .lte("created_at", today.format("YYYY-MM-DD"))
      .eq("restaurant_id", restaurantId);

    if (error) throw new Error(error.message);

    // Calculate receipts for current and last month
    const receiptCurrentMonth = orders
      .filter(
        (order) =>
          dayjs(order.created_at).format("YYYY-MM-DD") >= startOfCurrentMonth
      )
      .reduce((acc, order) => acc + order.total, 0);

    const receiptLastMonth = orders
      .filter(
        (order) =>
          dayjs(order.created_at).format("YYYY-MM-DD") < startOfCurrentMonth
      )
      .reduce((acc, order) => acc + order.total, 0);

    // Convert from cents to dollars or your currency unit
    const receiptCurrentMonthInCurrency = receiptCurrentMonth / 100;
    const receiptLastMonthInCurrency = receiptLastMonth / 100;

    // Calculate the difference
    let diffFromLastMonth = 0;
    if (receiptLastMonthInCurrency > 0) {
      diffFromLastMonth =
        ((receiptCurrentMonthInCurrency - receiptLastMonthInCurrency) /
          receiptLastMonthInCurrency) *
        100;
    }

    return {
      receipt: receiptCurrentMonthInCurrency.toFixed(2),
      diffFromLastMonth: diffFromLastMonth.toFixed(2),
    };
  } catch (error) {
    console.error("Error fetching month receipt:", error);
    throw error;
  }
};

export const getMonthOrdersAmount = async (restaurantId) => {
  try {
    const today = dayjs();
    const startOfCurrentMonth = today.startOf("month").format("YYYY-MM-DD");
    const startOfLastMonth = today
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

    // Fetch orders from the start of last month to today
    const { data: orders, error } = await supabase
      .from("orders")
      .select("created_at")
      .gte("created_at", startOfLastMonth)
      .lte("created_at", today.format("YYYY-MM-DD"))
      .eq("restaurant_id", restaurantId);

    if (error) throw new Error(error.message);

    // Count orders for current and last month
    const ordersCurrentMonth = orders.filter(
      (order) =>
        dayjs(order.created_at).format("YYYY-MM-DD") >= startOfCurrentMonth
    ).length;
    const ordersLastMonth = orders.filter(
      (order) =>
        dayjs(order.created_at).format("YYYY-MM-DD") < startOfCurrentMonth
    ).length;

    // Calculate the difference
    let diffFromLastMonth =
      ordersLastMonth > 0
        ? (ordersCurrentMonth / ordersLastMonth) * 100 - 100
        : null;

    return {
      amount: ordersCurrentMonth,
      diffFromLastMonth: diffFromLastMonth ? diffFromLastMonth.toFixed(2) : 0,
    };
  } catch (error) {
    console.error("Error fetching month orders amount:", error);
    throw error;
  }
};

export const getPopularProductsAmount = async (restaurantId) => {
  try {
    const startOfMonth = dayjs().startOf("month").toISOString();

    // Ajuste a consulta para buscar apenas os itens necessários sem agrupamento
    const { data: orderItems, error } = await supabase
      .from("order_items")
      .select("product_id")
      .eq("restaurant_id", restaurantId) // Se você tem um campo restaurant_id nos seus itens de pedido
      .gte("created_at", startOfMonth);

    if (error) {
      throw new Error(error.message);
    }

    // Agora, realizamos o agrupamento e contagem no lado do servidor
    const productCount = orderItems.reduce((acc, item) => {
      acc[item.product_id] = (acc[item.product_id] || 0) + 1;
      return acc;
    }, {});

    // Transforma o objeto em um array e ordena pelo número de pedidos
    const sortedProducts = Object.keys(productCount)
      .map((key) => ({
        product_id: key,
        amount: productCount[key],
      }))
      .sort((a, b) => b.amount - a.amount);

    return sortedProducts;
  } catch (error) {
    console.error("Error fetching popular products amount:", error);
    throw error;
  }
};

export const getDailyRevenueInPeriodService = async (
  restaurantId,
  from,
  to
) => {
  try {
    const startDate = from
      ? dayjs(from).startOf("day")
      : dayjs().subtract(7, "days").startOf("day");
    const endDate = to ? dayjs(to).endOf("day") : dayjs().endOf("day");

    const { data, error } = await supabase
      .from("orders")
      .select("created_at, total")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    if (error) throw error;

    // Processa os dados para calcular o recebimento diário
    const dailyRevenue = {}; // Exemplo: {'2023-03-31': 1500, ...}
    data.forEach((order) => {
      const day = dayjs(order.created_at).format("YYYY-MM-DD");
      dailyRevenue[day] = (dailyRevenue[day] || 0) + order.total;
    });

    // Converte o objeto em array de objetos
    const revenueData = Object.keys(dailyRevenue).map((date) => ({
      date,
      revenue: dailyRevenue[date],
    }));

    return revenueData;
  } catch (error) {
    console.error("Error fetching daily revenue in period:", error);
    throw error;
  }
};
