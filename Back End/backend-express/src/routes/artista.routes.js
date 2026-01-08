const express = require("express");
const router = express.Router();

const {
  obtenerArtistas,
  obtenerArtistaPorId,
  crearArtista,
  actualizarArtista,
  parcharArtista,
  eliminarArtista
} = require("../controllers/artista.controller");


router.get("/", obtenerArtistas);
router.get("/:id", obtenerArtistaPorId);

router.post("/", crearArtista);


router.put("/:id", actualizarArtista);


router.patch("/:id", parcharArtista);


router.delete("/:id", eliminarArtista);

module.exports = router;
