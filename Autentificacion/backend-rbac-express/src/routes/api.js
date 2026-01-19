const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/usuarios", require("./usuario.routes"));
router.use("/datos", require("./datos.routes"));
router.use("/artista", require("./artista.routes"));


module.exports = router;
