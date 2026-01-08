const pool = require("../config/database");


exports.obtenerArtistas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM artista");

    res.json({
      total: rows.length,
      artistas: rows
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener artistas",
      detalle: error.message
    });
  }
};


exports.obtenerArtistaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM artista WHERE Identificador_Artista = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener artista",
      detalle: error.message
    });
  }
};



exports.crearArtista = async (req, res) => {
  const {
    Identificador_Artista,
    Cedula_Artista,
    Nombre_Artista,
    Apellido_Artista,
    Tipo_Artista
  } = req.body;


  if (!Identificador_Artista || !Cedula_Artista || !Nombre_Artista || !Apellido_Artista || !Tipo_Artista) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios"
    });
  }

  try {
    const sql = `
      INSERT INTO artista 
      (Identificador_Artista, Cedula_Artista, Nombre_Artista, Apellido_Artista, Tipo_Artista)
      VALUES (?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      Identificador_Artista,
      Cedula_Artista,
      Nombre_Artista,
      Apellido_Artista,
      Tipo_Artista
    ]);

    res.status(201).json({
      mensaje: "Artista creado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      error: "Error al crear artista",
      detalle: error.message
    });
  }
};




exports.actualizarArtista = async (req, res) => {
  const { id } = req.params;
  const {
    Cedula_Artista,
    Nombre_Artista,
    Apellido_Artista,
    Tipo_Artista
  } = req.body;

  if (!Cedula_Artista || !Nombre_Artista || !Apellido_Artista || !Tipo_Artista) {
    return res.status(400).json({
      error: "Debes enviar todos los campos"
    });
  }

  try {
    const [result] = await pool.query(
      `UPDATE artista 
       SET Cedula_Artista=?, Nombre_Artista=?, Apellido_Artista=?, Tipo_Artista=?
       WHERE Identificador_Artista=?`,
      [Cedula_Artista, Nombre_Artista, Apellido_Artista, Tipo_Artista, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.json({ mensaje: "Artista actualizado completamente" });

  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar artista",
      detalle: error.message
    });
  }
};



exports.parcharArtista = async (req, res) => {
  const { id } = req.params;
  const campos = req.body;

  if (Object.keys(campos).length === 0) {
    return res.status(400).json({ error: "No se enviaron campos para actualizar" });
  }

  try {
    let sql = "UPDATE artista SET ";
    const valores = [];

    for (const campo in campos) {
      sql += `${campo}=?, `;
      valores.push(campos[campo]);
    }

    sql = sql.slice(0, -2); 
    sql += " WHERE Identificador_Artista=?";
    valores.push(id);

    const [result] = await pool.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.json({ mensaje: "Artista actualizado parcialmente" });

  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar parcialmente",
      detalle: error.message
    });
  }
};


// DELETE - eliminar artista
exports.eliminarArtista = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM artista WHERE Identificador_Artista=?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.json({ mensaje: "Artista eliminado correctamente" });

  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar artista",
      detalle: error.message
    });
  }
};

