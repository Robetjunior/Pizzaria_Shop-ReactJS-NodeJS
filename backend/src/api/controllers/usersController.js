// ./src/api/controllers/usersController.js
import { v4 as uuidv4 } from "uuid";

import { calculateOptimizedRoute } from "../../services/routeOptmizationService.js";
import {
  fetchUsers,
  adicionarCliente,
  getUserById,
  getUserByPhoneNumber,
  getUserByEmail,
  getUserIdByAuthCode,
  storeAuthCode,
  deleteAuthCode,
} from "../../services/userService.js";

import jwt from "jsonwebtoken";

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

export const authenticateUserWithCode = async (req, res) => {
  const { code } = req.query;
  try {
    const userId = await getUserIdByAuthCode(code);
    console.log(!userId);
    if (!userId) {
      return res
        .status(404)
        .json({ error: "Código de autenticação inválido ou expirado" });
    }

    // Supondo que a autenticação seja bem-sucedida e você tenha o ID do usuário, você gera um JWT
    const token = jwt.sign({ id: userId }, "your_secret_key", {
      expiresIn: "1h",
    });

    console.log(token);

    // Configurando o JWT em um cookie HttpOnly
    res.cookie("auth", token, {
      httpOnly: true, // Importante para evitar acesso via JavaScript
      secure: true, // Envia o cookie apenas sobre HTTPS
      sameSite: "strict", // Restringe o envio do cookie a solicitações originárias do mesmo site
      maxAge: 3600000, // Tempo de vida do cookie em milissegundos
    });

    await deleteAuthCode(code);

    res.redirect("http://localhost:5173/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserByEmailToAuthenticate = async (req, res) => {
  try {
    const email = req.params.email;
    console.log("entrou aqui?", email);
    if (!email) {
      return res.status(400).json({ error: "Email inválido" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    const authCode = uuidv4();
    await storeAuthCode(user.id, authCode);

    const authLink = `http://localhost:3333/api/users/authenticate?code=${authCode}`;
    console.log(authLink);
    // Aqui você pode enviar o link por email ao usuário

    res.json({ message: "Link de autenticação enviado." });
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
