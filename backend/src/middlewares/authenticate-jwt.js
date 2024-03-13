export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.auth; // Assumindo que o nome do cookie é 'auth'

  if (!token) {
    return res.sendStatus(403); // Acesso negado se não houver token
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Acesso negado se o token for inválido
    }

    req.user = user; // Armazenar o payload do JWT na requisição para uso posterior
    next(); // Prosseguir para a próxima função de middleware/route handler
  });
};
