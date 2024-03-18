require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Importa a configuração da API
const api = require("./api/api");
// Importa as rotas de sign-out
const signOutRoutes = require("./api/routes/sign-out");

const app = express();
const port = process.env.PORT || 3333; // Usar a porta do .env se disponível

// Configuração detalhada do CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Ou a sua origem específica
    credentials: true,
  })
);

// Substitui bodyParser.json() pelo express.json() para análise de corpos de requisição JSON
app.use(express.json());
// Middleware para analisar cookies
app.use(cookieParser());

// Utiliza a API
app.use("/api", api);
// Utiliza as rotas de sign-out
app.use("/api/sign-out", signOutRoutes);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
