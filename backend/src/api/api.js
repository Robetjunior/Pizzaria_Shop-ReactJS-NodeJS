import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use("/users", userRoutes);

module.exports = app;
