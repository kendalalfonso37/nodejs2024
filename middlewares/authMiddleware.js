const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extrae el token del header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado, token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con el secret en nuestro .env
    req.user = decoded; // Guarda los datos decodificados en `req.user` para usarlos en las rutas
    next(); // Continúa con la siguiente función en la ruta
  } catch (error) {
    return res.status(403).json({ message: "Token no válido." });
  }
};

module.exports = authMiddleware;
