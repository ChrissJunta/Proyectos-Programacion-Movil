const { queryWithUser } = require("../config/sqlserver.dynamic");
const { signToken } = require("../utils/jwt");
const { fail, ok } = require("../utils/response");
const crypto = require("crypto");
const { setSession } = require("../utils/session.store");

function resolveDbRole(row) {
  // prioriza el más alto
  if (row.is_owner === 1) return "db_owner";
  if (row.is_writer === 1) return "db_datawriter";
  if (row.is_reader === 1) return "db_datareader";
  return "public";
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return fail(res, 400, "username y password son requeridos");

    // 1) Intentar conectar y leer rol real (si falla, credenciales inválidas)
    const roleQuery = `
      SELECT
        IS_MEMBER('db_owner')      AS is_owner,
        IS_MEMBER('db_datawriter') AS is_writer,
        IS_MEMBER('db_datareader') AS is_reader;
    `;

    const result = await queryWithUser({ username, password }, roleQuery);
    const row = result.recordset?.[0];
    if (!row) return fail(res, 401, "Credenciales inválidas");

    const dbRole = resolveDbRole(row);

    // 2) Crear sesión (jti) y guardar credenciales en memoria
    const jti = crypto.randomUUID();
    setSession(jti, { username, password });

    // 3) Emitir JWT
    const payload = { username, dbRole, jti };
    const token = signToken(payload);

    return ok(res, { token, user: { username, dbRole } }, "Login exitoso");
  } catch (e) {
    // Si no pudo conectar, es credencial inválida o el user no tiene acceso a la DB
    return fail(res, 401, "No se pudo autenticar (credenciales o permisos de acceso a la BD)");
  }
}

module.exports = { login };
