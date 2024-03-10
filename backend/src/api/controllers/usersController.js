// ./src/api/controllers/usersController.js
import { calculateOptimizedRoute } from "../../services/routeOptmizationService.js";
import {
  fetchUsers,
  adicionarCliente,
  getUserById,
  getUserByPhoneNumber,
} from "../../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    console.log("buscar usário por id");
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserByPhoneNumberController = async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Número de telefone inválido" });
    }
    const user = await getUserByPhoneNumber(phoneNumber);
    if (!user) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addCliente = async (req, res) => {
  try {
    const cliente = await adicionarCliente(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const optimizeRoute = async (req, res) => {
  try {
    const route = await calculateOptimizedRoute();
    res.json(route);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
