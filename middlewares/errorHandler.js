const errorHandler = (err, req, res, next) => {
  // Log del Error en consola
  console.log(err);
  // Si el error es una instancia de Error, usa su mensaje; si no, responde con un mensaje genérico
  const message = err.message || "Error en el servidor";

  // Define el código de estado HTTP (500 si no se especifica en el error)
  const status = err.status || 500;

  // Responde con el mensaje de error y el código de estado
  res.status(status).json({
    success: false,
    message,
    status,
  });
};

module.exports = errorHandler;
