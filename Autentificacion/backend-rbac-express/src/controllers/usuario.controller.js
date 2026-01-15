const { execSPWithUser, sql } = require("../config/sqlserver.dynamic");
const { fail, created, ok } = require("../utils/response");

async function createUser(req, res) {
  try {
    const { username, password, rol } = req.body;
    if (!username || !password || !rol) return fail(res, 400, "Datos incompletos");

    // Solo db_owner debe pasar aquí (por middleware)
    const result = await execSPWithUser(req.db, "add_users", [
      { name: "username", type: sql.VarChar(50), value: username },
      { name: "password", type: sql.VarChar(200), value: password },
      { name: "rol", type: sql.VarChar(20), value: rol } // ej: db_datareader/db_datawriter/db_owner
    ]);

    return created(res, { result: result.recordset ?? [] }, "Usuario creado");
  } catch {
    // Aquí SQL Server puede bloquear si el usuario no tiene permisos reales
    return fail(res, 500, "Error creando usuario (permisos SQL o SP)");
  }
}

async function listUsers(req, res) {
  try {
    const result = await execSPWithUser(req.db, "list_users", []);
    return ok(res, result.recordset ?? [], "Usuarios");
  } catch {
    return fail(res, 500, "Error listando usuarios");
  }
}

module.exports = { createUser, listUsers };
