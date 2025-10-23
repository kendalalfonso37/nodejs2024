const { StatusCodes } = require("http-status-codes");

// eslint-disable-next-line no-unused-vars
const notFoundHandler = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "La ruta solicitada no existe",
    status: StatusCodes.NOT_FOUND,
  });
};

module.exports = notFoundHandler;
