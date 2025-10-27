const express = require("express");

const router = express.Router();

// importamos todas nuestras rutas
const authRoutes = require("./authRoutes");
const usuariosRoutes = require("./usuariosRoutes");
const rolesRoutes = require("./rolesRoutes");
const categoriasRoutes = require("./categoriasRoutes");
const productosRoutes = require("./productosRoutes");

// cargamos nuestras rutas al router principal.
router.use("/auth", authRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/roles", rolesRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/productos", productosRoutes);

module.exports = router;
