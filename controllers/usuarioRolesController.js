/** @type {import("express").RequestHandler} */

const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");

const {
  internalServerErrorResponse,
} = require("../utils/responseUtils");
const UsuarioRolesService = require("../services/UsuarioRolesService");
const AppError = require("../services/AppError");

const usuarioRolesService = new UsuarioRolesService();

const handleServiceError = (res, error, defaultMessage) => {
  console.log(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode,
    });
  }

  return internalServerErrorResponse(res, defaultMessage);
};

const getUsuarioRoles = async (req = request, res = response) => {
  const usuarioId = req.params.id;

  try {
    const roles = await usuarioRolesService.listRolesForUser(usuarioId);

    return res.status(StatusCodes.OK).json(roles);
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo obtener los roles del usuario."
    );
  }
};

const createUsuarioRole = async (req = request, res = response) => {
  const usuarioId = req.params.id;
  const { rolId } = req.body;

  try {
    const roles = await usuarioRolesService.addRoleToUser(usuarioId, rolId);

    return res.status(StatusCodes.CREATED).json(roles);
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo asignar el rol al usuario."
    );
  }
};

const deleteUsuarioRole = async (req = request, res = response) => {
  const usuarioId = req.params.id;
  const { rolId } = req.body;

  try {
    await usuarioRolesService.removeRoleFromUser(usuarioId, rolId);

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo eliminar el rol del usuario."
    );
  }
};

module.exports = {
  getUsuarioRoles,
  createUsuarioRole,
  deleteUsuarioRole,
};
