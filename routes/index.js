const express = require("express");

const router = express.Router();

// importamos todas nuestras rutas
const authRoutes = require("./authRoutes");
const usuariosRoutes = require("./usuariosRoutes");
const rolesRoutes = require("./rolesRoutes");

// cargamos nuestras rutas al router principal.
router.use("/auth", authRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/roles", rolesRoutes);

module.exports = router;
