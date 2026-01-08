let mensajes = [
  { id: 1, contenido: "Sigue aprendiendo, estás haciendo un gran trabajo." },
];

// GET - obtener todos los mensajes
exports.obtenerMensajes = (req, res) => {
  res.json({
    status: "ok",
    cantidad: mensajes.length,
    mensajes,
  });
};

// POST - agregar un mensaje nuevo
exports.crearMensaje = (req, res) => {
  const { contenido } = req.body;

  if (!contenido) {
    return res.status(400).json({
      status: "error",
      mensaje: "El campo 'contenido' es obligatorio.",
    });
  }

  const nuevo = {
    id: mensajes.length + 1,
    contenido,
  };

  mensajes.push(nuevo);

  res.status(201).json({
    status: "creado",
    mensaje: "Mensaje agregado correctamente.",
    data: nuevo,
  });
};

// DELETE - eliminar por ID
exports.eliminarMensaje = (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id);

  const indice = mensajes.findIndex((m) => m.id === idNum);

  if (indice === -1) {
    return res.status(404).json({
      status: "error",
      mensaje: "No existe un mensaje con ese ID.",
    });
  }

  mensajes.splice(indice, 1);

  res.json({
    status: "eliminado",
    mensaje: `Mensaje con id ${idNum} eliminado.`,
  });
};



// PUT - actualizar mensaje por ID
exports.actualizarMensaje = (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id);

  const { contenido } = req.body;

  // Buscar el mensaje
  const mensaje = mensajes.find((m) => m.id === idNum);

  if (!mensaje) {
    return res.status(404).json({
      status: "error",
      mensaje: "No existe un mensaje con ese ID.",
    });
  }

  // Validar contenido vacío
  if (!contenido) {
    return res.status(400).json({
      status: "error",
      mensaje: "El campo 'contenido' es obligatorio para actualizar.",
    });
  }

  // Actualizar
  mensaje.contenido = contenido;

  res.json({
    status: "actualizado",
    mensaje: "Mensaje actualizado correctamente.",
    data: mensaje,
  });
};

