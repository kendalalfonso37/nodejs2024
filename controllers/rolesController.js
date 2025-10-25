/** @type {import("express").RequestHandler} */

const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");

const { Rol } = require("./../models/index");
const {
  notFoundResponse,
  conflictResponse,
  internalServerErrorResponse,
} = require("../utils/responseUtils");

const getRolesList = async (req = request, res = response) => {
  try {
    const roles = await Rol.findAll({ order: ["id"] });
    return res.status(StatusCodes.OK).json(roles);
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(
      res,
      "No se pudo obtener la lista de roles."
    );
  }
};

const getRolById = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const role = await Rol.findByPk(id);

    if (role === null) {
      return notFoundResponse(res, `Rol no encontrado.`);
    }

    return res.status(StatusCodes.OK).json(role);
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(res, "No se pudo obtener el rol.");
  }
};

const createRol = async (req = request, res = response) => {
  const { nombre, descripcion } = req.body;

  try {
    let role;
    // Crear el nuevo rol
    try {
      role = await Rol.create({
        nombre,
        descripcion,
        isActive: true,
      });
    } catch (error) {
      console.log(error);
      return conflictResponse(res, "No se pudo crear el rol.");
    }

    return res.status(StatusCodes.CREATED).json(role);
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(res, "No se pudo crear el rol.");
  }
};

const updateRol = async (req = request, res = response) => {
  const { nombre, descripcion, isActive } = req.body;
  const id = req.params.id;

  try {
    // Recuperar el usuario previo a actualizar su informacion:
    const role = await Rol.findByPk(id);
    if (role === null) {
      return notFoundResponse(res, "Rol no encontrado.");
    }

    // Validaciones
    if (nombre !== undefined) {
      role.nombre = nombre;
    }

    if (descripcion !== undefined) {
      role.descripcion = descripcion;
    }

    if (isActive !== undefined) {
      role.isActive = isActive;
    }

    await role.save();

    return res.status(StatusCodes.OK).json(role);
  } catch (error) {
    console.log(error);
    return conflictResponse(res, "No se pudo actualizar el rol.");
  }
};

const deleteRol = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const role = await Rol.findByPk(id);

    if (role === null) {
      return notFoundResponse(res, "Rol no encontrado.");
    }

    await role.destroy();

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    console.log(error);
    return conflictResponse(res, "No se pudo eliminar el rol.");
  }
};

module.exports = {
  getRolesList,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
};
