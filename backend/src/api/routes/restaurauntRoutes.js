import express from "express";
import * as restaurantController from "../controllers/restaurauntController.js";
import { authenticateJWT } from "../../middlewares/authenticate-jwt.js";

const router = express.Router();

router.get("/getRestaurants", restaurantController.getRestaurants);

router.get(
  "/getManagedRestaurant",
  authenticateJWT,
  restaurantController.getManagedRestaurant
);

router.post("/registerRestaurants", restaurantController.createRestaurant);

router.put("/profile", authenticateJWT, restaurantController.updateProfile);

export default router;
