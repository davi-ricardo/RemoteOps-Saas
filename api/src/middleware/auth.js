// Arquivo de middlewares de autenticação
const jwt = require("jsonwebtoken");
const db = require("../db");

// Middleware para autenticar o usuário via token JWT
const authenticate = async (req, res, next) => {
  try {
    // Verifica se o header Authorization existe na requisição
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Extrai o token do header (formato: "Bearer <token>")
    const token = authHeader.split(" ")[1];
    // Verifica a validade do token usando a chave secreta JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");

    // Busca o usuário no banco de dados usando o ID do token decodificado
    const result = await db.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);
    const user = result.rows[0];

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Verifica se o usuário está ativo
    if (!user.is_active) {
      return res.status(403).json({ error: "User is disabled" });
    }

    // Atribui o usuário à requisição para ser usado nas rotas
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware para permitir apenas usuários com role 'admin'
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

module.exports = { authenticate, adminOnly };
