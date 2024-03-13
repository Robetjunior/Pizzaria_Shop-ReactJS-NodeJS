import express from "express";
import * as restaurantController from "../controllers/restaurauntController.js";
import { authenticateJWT } from "../../middlewares/authenticate-jwt.js";

const router = express.Router();

router.get("/getRestaurants", restaurantController.getRestaurants);

router.post("/registerRestaurants", restaurantController.createRestaurant);

export default router;
