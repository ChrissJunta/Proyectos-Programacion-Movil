const express = require("express");
const router = express.Router();
const { test } = require("../controllers/test.controller");

router.get("/test", test);

module.exports = router;


const {
  obtenerMensajes,
  crearMensaje,
  eliminarMensaje,
  actualizarMensaje
} = require("../controllers/mensaje.controller");

router.get("/mensajes", obtenerMensajes);
router.post("/mensajes", crearMensaje);
router.put("/mensajes/:id", actualizarMensaje);   
router.delete("/mensajes/:id", eliminarMensaje);

const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  parcharUsuario,
  eliminarUsuario
} = require("../controllers/usuario.controller");

router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuarioPorId);
router.post("/usuarios", crearUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.patch("/usuarios/:id", parcharUsuario);
router.delete("/usuarios/:id", eliminarUsuario);


const artistaRoutes = require("./artista.routes");
router.use("/artistas", artistaRoutes);

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);
