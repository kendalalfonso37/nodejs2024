/** @type {import("express").RequestHandler} */

const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");

const {
  internalServerErrorResponse,
} = require("../utils/responseUtils");
const RolesService = require("../services/RolesService");
const AppError = require("../services/AppError");

const rolesService = new RolesService();

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

const getRolesList = async (req = request, res = response) => {
  try {
    const roles = await rolesService.list();
    return res.status(StatusCodes.OK).json(roles);
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo obtener la lista de roles."
    );
  }
};

const getRolById = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const role = await rolesService.getById(id);
    return res.status(StatusCodes.OK).json(role);
  } catch (error) {
    return handleServiceError(res, error, "No se pudo obtener el rol.");
  }
};

const createRol = async (req = request, res = response) => {
  const { nombre, descripcion } = req.body;

  try {
    const role = await rolesService.create({ nombre, descripcion });
    return res.status(StatusCodes.CREATED).json(role);
  } catch (error) {
    return handleServiceError(res, error, "No se pudo crear el rol.");
  }
};

const updateRol = async (req = request, res = response) => {
  const { nombre, descripcion, isActive } = req.body;
  const id = req.params.id;

  try {
    const role = await rolesService.update(id, {
      nombre,
      descripcion,
      isActive,
    });

    return res.status(StatusCodes.OK).json(role);
  } catch (error) {
    return handleServiceError(res, error, "No se pudo actualizar el rol.");
  }
};

const deleteRol = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    await rolesService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo eliminar el rol."
    );
  }
};

module.exports = {
  getRolesList,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
};
