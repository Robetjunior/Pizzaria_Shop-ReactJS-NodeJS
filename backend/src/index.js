const express = require("express");
const cors = require("cors");

// Importa a configuração da API
const api = require("./api/api");

const app = express();
const port = 3333;

// Aplica o CORS
app.use(cors());

// Substitui bodyParser.json() pelo express.json() para análise de corpos de requisição JSON
app.use(express.json());

// Utiliza a API
app.use("/api", api);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
