const express = require("express");

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("./../controllers/productosController");

const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getProductos);
router.get("/:id", authMiddleware, getProductoById);
router.post("/", authMiddleware, createProducto);
router.put("/:id", authMiddleware, updateProducto);
router.delete("/:id", authMiddleware, deleteProducto);

module.exports = router;
