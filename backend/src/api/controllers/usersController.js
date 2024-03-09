// ./src/api/controllers/usersController.js
import { fetchUsers, adicionarCliente } from "../../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers();
    res.json(users);
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
