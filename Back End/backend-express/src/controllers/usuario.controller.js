let usuarios = [
  { id: 1, nombre: "Carlos Pérez", email: "carlos@example.com", activo: true },
];

// GET todos los usuarios
exports.obtenerUsuarios = (req, res) => {
  res.json({
    total: usuarios.length,
    usuarios
  });
};

// GET usuario por ID
exports.obtenerUsuarioPorId = (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  res.json(usuario);
};

// POST crear usuario
exports.crearUsuario = (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Los campos 'nombre' y 'email' son obligatorios." });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "El email no es válido." });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
    activo: true
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    mensaje: "Usuario creado correctamente.",
    usuario: nuevoUsuario
  });
};

// PUT actualizar completamente
exports.actualizarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, email, activo } = req.body;

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  if (!nombre || !email || activo === undefined) {
    return res.status(400).json({ error: "Debes enviar todos los campos: nombre, email, activo." });
  }

  usuario.nombre = nombre;
  usuario.email = email;
  usuario.activo = activo;

  res.json({
    mensaje: "Usuario actualizado completamente.",
    usuario
  });
};

// PATCH actualizar parcialmente
exports.parcharUsuario = (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  const { nombre, email, activo } = req.body;

  if (nombre !== undefined) usuario.nombre = nombre;
  if (email !== undefined) usuario.email = email;
  if (activo !== undefined) usuario.activo = activo;

  res.json({
    mensaje: "Usuario actualizado parcialmente.",
    usuario
  });
};

// DELETE eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  
  if (!usuarios.some(u => u.id === id)) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  usuarios = usuarios.filter(u => u.id !== id);

  res.json({ mensaje: "Usuario eliminado correctamente." });
};
