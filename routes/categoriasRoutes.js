const express = require("express");

const {
  getGategoriasList,
  getCategoriaById,
} = require("./../controllers/categoriasController");

const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getGategoriasList);
router.get("/:id", authMiddleware, getCategoriaById);

module.exports = router;
