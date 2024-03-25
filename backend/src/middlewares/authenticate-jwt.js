import jwt from "jsonwebtoken";
import { supabase } from "../config/supabaseClient";

export const authenticateJWT = async (req, res, next) => {
  // Extrai o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN_AQUI
  if (!token) {
    return res.status(403).json({ error: "Access Denied: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", String(userId))
      .single();

    if (error || !user) {
      throw new Error("User not found.");
    }
    req.user = user;
    next();
  } catch (error) {
    // Chama a função onError para lidar com o erro
    return onError({ code: "UNAUTHORIZED", error, set: { status: 401 } }, res);
  }
};

// Função para tratamento de erros personalizados
const onError = ({ code, error, set }, res) => {
  switch (code) {
    case "UNAUTHORIZED":
      // Aqui você pode definir a resposta de erro de acordo com as suas necessidades
      // Por exemplo, se o erro for de autenticação não autorizada (401)
      res.status(set.status).json({ code, message: error.message });
      break;
    case "NOT_A_MANAGER":
      // Tratamento para o caso de não ser um gerente
      res.status(set.status).json({ code, message: error.message });
      break;
    default:
      // Outros tratamentos de erro podem ser definidos aqui
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      });
  }
};
