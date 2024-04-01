// Assuming your existing setup looks something like this:
import { Router } from "express";
import { authenticateJWT } from "../../middlewares/authenticate-jwt";
import {
  getDailyRevenueInPeriod,
  getDayOrdersAmount,
  getMonthCanceledOrders,
  getMonthlyOrdersAmount,
  getMonthlyReceipt,
  getPopularProducts,
} from "../controllers/metricsController";

const router = Router();

// Replace or add this line for the new endpoint
router.get("/day-orders-amount", authenticateJWT, getDayOrdersAmount);

router.get(
  "/month-canceled-orders-amount",
  authenticateJWT,
  getMonthCanceledOrders
);

router.get("/month-revenue", authenticateJWT, getMonthlyReceipt);

router.get("/month-orders-amount", authenticateJWT, getMonthlyOrdersAmount);

router.get("/popular-products", authenticateJWT, getPopularProducts);

router.get(
  "/daily-revenue-in-period",
  authenticateJWT,
  getDailyRevenueInPeriod
);

export default router;
