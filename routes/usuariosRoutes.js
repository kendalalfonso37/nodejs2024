const express = require("express");

const {
  getUsuariosList,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("./../controllers/usuariosController");
const {
  getUsuarioRoles,
  createUsuarioRole,
  deleteUsuarioRole,
} = require("../controllers/usuarioRolesController");

const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUsuariosList);
router.get("/:id", authMiddleware, getUsuarioById);
router.post("/", authMiddleware, createUsuario);
router.put("/:id", authMiddleware, updateUsuario);
router.delete("/:id", authMiddleware, deleteUsuario);

router.get("/:id/roles", authMiddleware, getUsuarioRoles);
router.post("/:id/roles", authMiddleware, createUsuarioRole);
router.delete("/:id/roles", authMiddleware, deleteUsuarioRole);

module.exports = router;
