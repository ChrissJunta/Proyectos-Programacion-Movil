const jwt = require("jsonwebtoken");
const { tryLogin } = require("../config/sqlserver.dynamic");

exports.login = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Debe enviar username y password." });
  }

  const auth = await tryLogin({ username, password });

  if (!auth.ok) {
  return res.status(401).json({
    error: "Credenciales inválidas o no se pudo conectar a SQL Server.",
    debug: auth.debug
  });
}


  const role = auth.isSysAdmin ? "admin" : "user";

  const token = jwt.sign(
    { sub: auth.loginName, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
  );

  res.json({
    message: "Login exitoso",
    user: { username: auth.loginName, role },
    token,
  });
};
