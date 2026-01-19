const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const { allowDbRoles } = require("../middlewares/role.middleware");
const artistaController = require("../controllers/artista.controller");

// LISTAR -> reader/writer/owner
router.get("/", authMiddleware, allowDbRoles("db_datareader", "db_datawriter", "db_owner"), artistaController.getAll);

// CREAR -> writer/owner
router.post("/", authMiddleware, allowDbRoles("db_datawriter", "db_owner"), artistaController.create);

// ACTUALIZAR -> writer/owner
router.put("/:id", authMiddleware, allowDbRoles("db_datawriter", "db_owner"), artistaController.update);

// ELIMINAR -> owner (tú lo pediste así)
router.delete("/:id", authMiddleware, allowDbRoles("db_owner"), artistaController.remove);

module.exports = router;
