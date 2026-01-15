const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/usuarios", require("./usuario.routes"));
router.use("/datos", require("./datos.routes"));

module.exports = router;
