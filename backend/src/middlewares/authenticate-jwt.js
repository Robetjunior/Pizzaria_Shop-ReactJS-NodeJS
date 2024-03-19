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
    return res.status(403).json({ error: "Invalid token." });
  }
};
