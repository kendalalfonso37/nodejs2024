const express = require("express");

const {
  getGategoriasList,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require("./../controllers/categoriasController");

const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getGategoriasList);
router.get("/:id", authMiddleware, getCategoriaById);
router.post("/", authMiddleware, createCategoria);
router.put("/:id", authMiddleware, updateCategoria);
router.delete("/:id", authMiddleware, deleteCategoria);

module.exports = router;
