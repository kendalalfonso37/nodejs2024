const jwt = require("jsonwebtoken");

require("dotenv").config();

const {
  unauthorizedResponse,
  forbiddenResponse,
} = require("../utils/responseUtils");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extrae el token del header

  if (!token) {
    return unauthorizedResponse(
      res,
      "Acceso denegado, token no proporcionado."
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con el secret en nuestro .env
    req.user = decoded; // Guarda los datos decodificados en `req.user` para usarlos en las rutas
    next(); // Continúa con la siguiente función en la ruta
  } catch (error) {
    console.log(error);
    return forbiddenResponse(res, "Token no válido.");
  }
};

module.exports = authMiddleware;
