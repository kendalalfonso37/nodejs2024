/** @type {import("express").RequestHandler} */

const { request, response } = require("express");
const { ValidationError } = require("sequelize");
const { StatusCodes } = require("http-status-codes");

const { Rol } = require("./../models/index");
const {
  notFoundResponse,
  conflictResponse,
} = require("../utils/responseUtils");

const getRolesList = async (req = request, res = response) => {
  const roles = await Rol.findAll({ order: ["id"] });
  return res.status(StatusCodes.OK).json(roles);
};

const getRolById = async (req = request, res = response) => {
  const id = req.params.id;

  const role = await Rol.findByPk(id);

  if (role === null) {
    return notFoundResponse(res, `Rol no encontrado.`);
  }

  return res.status(StatusCodes.OK).json(role);
};

const createRol = async (req = request, res = response) => {
  const { nombre, descripcion } = req.body;

  let role;
  // Crear el nuevo rol
  try {
    role = await Rol.create({
      nombre,
      descripcion,
      isActive: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return conflictResponse(res, "No se pudo crear el rol.");
    }
  }

  return res.status(StatusCodes.CREATED).json(role);
};

const updateRol = async (req = request, res = response) => {
  const { nombre, descripcion, isActive } = req.body;
  const id = req.params.id;

  // Recuperar el usuario previo a actualizar su informacion:
  const role = await Rol.findByPk(id);
  if (role === null) {
    return notFoundResponse(res, "Rol no encontrado.");
  }

  // Validaciones
  // is nombre is not null actualizarlo:
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
};

const deleteRol = async (req = request, res = response) => {
  const id = req.params.id;
  const role = await Rol.findByPk(id);
  if (role === null) {
    return notFoundResponse(res, "Rol no encontrado.");
  }
  await role.destroy();

  return res.status(StatusCodes.NO_CONTENT).json();
};

module.exports = { getRolesList, getRolById, createRol, updateRol, deleteRol };
