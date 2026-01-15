const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const { allowDbRoles } = require("../middlewares/role.middleware");
const { createUser, listUsers } = require("../controllers/usuario.controller");

router.get("/", authMiddleware, allowDbRoles("db_owner"), listUsers);
router.post("/", authMiddleware, allowDbRoles("db_owner"), createUser);

module.exports = router;
