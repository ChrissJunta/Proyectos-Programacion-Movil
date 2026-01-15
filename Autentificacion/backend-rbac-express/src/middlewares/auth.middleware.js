const { verifyToken } = require("../utils/jwt");
const { getSession } = require("../utils/session.store");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ ok: false, message: "Token requerido" });
  }

  try {
    const decoded = verifyToken(token);
    // decoded: { username, dbRole, jti }

    const session = getSession(decoded.jti);
    if (!session) {
      return res.status(401).json({ ok: false, message: "Sesión no encontrada (vuelve a iniciar sesión)" });
    }

    req.user = { username: decoded.username, dbRole: decoded.dbRole };
    req.db = { username: session.username, password: session.password }; // credenciales reales
    next();
  } catch {
    return res.status(401).json({ ok: false, message: "Token inválido o expirado" });
  }
}

module.exports = { authMiddleware };
