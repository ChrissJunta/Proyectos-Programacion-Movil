const { queryWithUser, sql } = require("../config/sqlserver.dynamic");
const { ok, created, fail } = require("../utils/response");

// GET /api/artista
async function getAll(req, res) {
  try {
    const q = `
      SELECT
        Identificador_Artista,
        Cedula_Artista,
        Nombre_Artista,
        Apellido_Artista,
        Tipo_Artista,
        Pais_Origen_Artista
      FROM dbo.artista
      ORDER BY Identificador_Artista DESC
    `;

    const result = await queryWithUser(req.db, q);
    return ok(res, result.recordset ?? [], "Artistas");
  } catch (e) {
    console.error("❌ getAll artistas error:", e);
    return fail(res, 500, "Error listando artistas");
  }
}

// POST /api/artista
async function create(req, res) {
  try {
    const {
      Identificador_Artista,
      Cedula_Artista,
      Nombre_Artista,
      Apellido_Artista,
      Tipo_Artista,
      Pais_Origen_Artista,
    } = req.body;

    if (!Identificador_Artista || String(Identificador_Artista).trim().length === 0) {
      return fail(res, 400, "Identificador_Artista es obligatorio");
    }

    const q = `
      INSERT INTO dbo.artista (
        Identificador_Artista,
        Cedula_Artista,
        Nombre_Artista,
        Apellido_Artista,
        Tipo_Artista,
        Pais_Origen_Artista
      )
      OUTPUT
        INSERTED.Identificador_Artista,
        INSERTED.Cedula_Artista,
        INSERTED.Nombre_Artista,
        INSERTED.Apellido_Artista,
        INSERTED.Tipo_Artista,
        INSERTED.Pais_Origen_Artista
      VALUES (
        @Identificador_Artista,
        @Cedula_Artista,
        @Nombre_Artista,
        @Apellido_Artista,
        @Tipo_Artista,
        @Pais_Origen_Artista
      )
    `;

    const params = [
      { name: "Identificador_Artista", type: sql.NVarChar(6), value: String(Identificador_Artista).trim() },
      { name: "Cedula_Artista", type: sql.NVarChar(15), value: Cedula_Artista ? String(Cedula_Artista).trim() : null },
      { name: "Nombre_Artista", type: sql.NVarChar(30), value: Nombre_Artista ? String(Nombre_Artista).trim() : null },
      { name: "Apellido_Artista", type: sql.NVarChar(30), value: Apellido_Artista ? String(Apellido_Artista).trim() : null },
      { name: "Tipo_Artista", type: sql.NVarChar(30), value: Tipo_Artista ? String(Tipo_Artista).trim() : null },
      { name: "Pais_Origen_Artista", type: sql.NVarChar(40), value: Pais_Origen_Artista ? String(Pais_Origen_Artista).trim() : null },
    ];

    const result = await queryWithUser(req.db, q, params);
    return created(res, result.recordset?.[0] ?? null, "Artista creado");
  } catch (e) {
    console.error("❌ create artista error:", e);
    return fail(res, 500, "Error creando artista");
  }
}

// PUT /api/artista/:id  (id = Identificador_Artista)
async function update(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) return fail(res, 400, "id inválido");

    const {
      Cedula_Artista,
      Nombre_Artista,
      Apellido_Artista,
      Tipo_Artista,
      Pais_Origen_Artista,
    } = req.body;

    const q = `
      UPDATE dbo.artista
      SET
        Cedula_Artista = @Cedula_Artista,
        Nombre_Artista = @Nombre_Artista,
        Apellido_Artista = @Apellido_Artista,
        Tipo_Artista = @Tipo_Artista,
        Pais_Origen_Artista = @Pais_Origen_Artista
      OUTPUT
        INSERTED.Identificador_Artista,
        INSERTED.Cedula_Artista,
        INSERTED.Nombre_Artista,
        INSERTED.Apellido_Artista,
        INSERTED.Tipo_Artista,
        INSERTED.Pais_Origen_Artista
      WHERE Identificador_Artista = @id
    `;

    const params = [
      { name: "id", type: sql.NVarChar(6), value: id },
      { name: "Cedula_Artista", type: sql.NVarChar(15), value: Cedula_Artista ? String(Cedula_Artista).trim() : null },
      { name: "Nombre_Artista", type: sql.NVarChar(30), value: Nombre_Artista ? String(Nombre_Artista).trim() : null },
      { name: "Apellido_Artista", type: sql.NVarChar(30), value: Apellido_Artista ? String(Apellido_Artista).trim() : null },
      { name: "Tipo_Artista", type: sql.NVarChar(30), value: Tipo_Artista ? String(Tipo_Artista).trim() : null },
      { name: "Pais_Origen_Artista", type: sql.NVarChar(40), value: Pais_Origen_Artista ? String(Pais_Origen_Artista).trim() : null },
    ];

    const result = await queryWithUser(req.db, q, params);
    const row = result.recordset?.[0];
    if (!row) return fail(res, 404, "Artista no encontrado");

    return ok(res, row, "Artista actualizado");
  } catch (e) {
    console.error("❌ update artista error:", e);
    return fail(res, 500, "Error actualizando artista");
  }
}

// DELETE /api/artista/:id
async function remove(req, res) {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) return fail(res, 400, "id inválido");

    const q = `
      DELETE FROM dbo.artista
      OUTPUT
        DELETED.Identificador_Artista,
        DELETED.Cedula_Artista,
        DELETED.Nombre_Artista,
        DELETED.Apellido_Artista,
        DELETED.Tipo_Artista,
        DELETED.Pais_Origen_Artista
      WHERE Identificador_Artista = @id
    `;

    const params = [{ name: "id", type: sql.NVarChar(6), value: id }];

    const result = await queryWithUser(req.db, q, params);
    const row = result.recordset?.[0];
    if (!row) return fail(res, 404, "Artista no encontrado");

    return ok(res, row, "Artista eliminado");
  } catch (e) {
    console.error("❌ delete artista error:", e);
    return fail(res, 500, "Error eliminando artista");
  }
}

module.exports = { getAll, create, update, remove };
