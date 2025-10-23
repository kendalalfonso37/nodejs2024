const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const notFoundResponse = (res, message = ReasonPhrases.NOT_FOUND) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message,
    status: StatusCodes.NOT_FOUND,
  });
};

const badRequestResponse = (res, message = ReasonPhrases.BAD_REQUEST) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    message,
    status: StatusCodes.BAD_REQUEST,
  });
};

const conflictResponse = (res, message = ReasonPhrases.CONFLICT) => {
  return res.status(StatusCodes.CONFLICT).json({
    message,
    status: StatusCodes.CONFLICT,
  });
};

const forbiddenResponse = (res, message = ReasonPhrases.FORBIDDEN) => {
  return res.status(StatusCodes.FORBIDDEN).json({
    message,
    status: StatusCodes.FORBIDDEN,
  });
};

const unauthorizedResponse = (res, message = ReasonPhrases.UNAUTHORIZED) => {
  return res.status(StatusCodes.UNAUTHORIZED).json({
    message,
    status: StatusCodes.UNAUTHORIZED,
  });
};

const internalServerErrorResponse = (
  res,
  message = ReasonPhrases.INTERNAL_SERVER_ERROR
) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};

module.exports = {
  notFoundResponse,
  badRequestResponse,
  conflictResponse,
  forbiddenResponse,
  unauthorizedResponse,
  internalServerErrorResponse,
};
