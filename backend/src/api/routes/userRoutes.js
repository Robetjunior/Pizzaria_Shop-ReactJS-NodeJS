import express from "express";
import * as usersController from "../controllers/usersController.js";
import { authenticateJWT } from "../../middlewares/authenticate-jwt.js";

const router = express.Router();

// Rota para otimização de rota de visitação dos clientes
router.get("/auth/me", authenticateJWT, usersController.getProfile);

// Autenticação por e-mail (deve ser especificado antes da rota genérica)
router.get(
  "/authenticate/:email",
  usersController.getUserByEmailToAuthenticate
);

router.get("/authenticate", usersController.authenticateUserWithCode);

// Buscar cliente por número de telefodeleteAuthCode is not definedne
router.get(
  "/phone/:phoneNumber",
  usersController.getUserByPhoneNumberController
);

// Buscar cliente por ID
router.get("/:id", usersController.getUserByIdController);

// Rota para listar todos os usuários/clientes
router.get("/", usersController.getUsers);

// Rota para adicionar um novo cliente
router.post("/", usersController.addCliente);

export default router;
