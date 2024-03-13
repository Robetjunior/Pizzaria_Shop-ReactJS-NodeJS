const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa o pacote CORS

// Importa a configuração da API
const api = require("./api/api");

const app = express();
const port = 3333;

app.use(cors()); // Aplica o CORS
app.use(bodyParser.json());

// Utiliza a API
app.use("/api", api);

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
