const express = require("express");

const {
  getRolById,
  getRolesList,
  createRol,
  updateRol,
  deleteRol,
} = require("./../controllers/rolesController");

const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getRolesList);
router.get("/:id", authMiddleware, getRolById);
router.post("/", authMiddleware, createRol);
router.put("/:id", authMiddleware, updateRol);
router.delete("/:id", authMiddleware, deleteRol);

module.exports = router;
