// ./src/api/routes/userRoutes.js
import express from "express";
import * as usersController from "../controllers/usersController.js"; // ajuste o caminho conforme necessário

const router = express.Router();

// Rota para listar todos os usuários
router.get("/", usersController.getUsers);

// Rota para adicionar um novo cliente
router.post("/", usersController.addCliente);

export default router;
