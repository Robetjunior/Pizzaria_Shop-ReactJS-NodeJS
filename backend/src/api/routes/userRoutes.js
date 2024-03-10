import express from "express";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

// Rota para otimização de rota de visitação dos clientes
// Defina esta rota antes das rotas dinâmicas para evitar conflitos
router.get("/optimize-route", usersController.optimizeRoute);

// Rota para listar todos os usuários/clientes
router.get("/", usersController.getUsers);

// Rota para adicionar um novo cliente
router.post("/", usersController.addCliente);

// Rotas para operações específicas de usuários/clientes
// Essas rotas usam parâmetros e devem vir depois das rotas estáticas
// Buscar cliente por número de telefone
router.get(
  "/phone/:phoneNumber",
  usersController.getUserByPhoneNumberController
);

// Buscar cliente por ID
// Como essa rota pode capturar qualquer coisa, deve ser uma das últimas rotas definidas
router.get("/:id", usersController.getUserByIdController);

export default router;
