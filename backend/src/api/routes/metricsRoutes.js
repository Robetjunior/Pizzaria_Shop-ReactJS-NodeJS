// Assuming your existing setup looks something like this:
import { Router } from "express";
import { authenticateJWT } from "../../middlewares/authenticate-jwt";
import {
  getDayOrdersAmount,
  getMonthCanceledOrders,
  getMonthlyOrdersAmount,
  getMonthlyReceipt,
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

export default router;
