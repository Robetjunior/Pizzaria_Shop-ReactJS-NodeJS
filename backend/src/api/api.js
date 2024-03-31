import express from "express";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurauntRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";

const app = express();

app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/metrics", metricsRoutes);

module.exports = app;
