import express from "express";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurauntRoutes.js";

const app = express();

app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);

module.exports = app;
