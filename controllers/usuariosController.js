/** @type {import("express").RequestHandler} */

const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");

const {
  internalServerErrorResponse,
} = require("../utils/responseUtils");
const UsuariosService = require("../services/UsuariosService");
const AppError = require("../services/AppError");

const usuariosService = new UsuariosService();

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

const getUsuariosList = async (req = request, res = response) => {
  try {
    const users = await usuariosService.list();
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo obtener la lista de usuarios."
    );
  }
};

const getUsuarioById = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const user = await usuariosService.getById(id);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return handleServiceError(res, error, "No se pudo obtener el usuario.");
  }
};

const createUsuario = async (req = request, res = response) => {
  const { username, email, password: plainPassword } = req.body;

  try {
    const user = await usuariosService.create({
      username,
      email,
      password: plainPassword,
    });

    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return handleServiceError(res, error, "No se pudo crear el usuario.");
  }
};

const updateUsuario = async (req = request, res = response) => {
  const { username, email, password, isActive } = req.body;
  const id = req.params.id;

  try {
    const user = await usuariosService.update(id, {
      username,
      email,
      password,
      isActive,
    });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo actualizar el usuario."
    );
  }
};

const deleteUsuario = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    await usuariosService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    return handleServiceError(
      res,
      error,
      "No se pudo eliminar el usuario."
    );
  }
};

module.exports = {
  getUsuariosList,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
