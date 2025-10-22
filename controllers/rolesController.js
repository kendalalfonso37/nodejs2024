/** @type {import("express").RequestHandler} */

const { Rol } = require("./../models/index");
const { request, response } = require("express");
const {
  notFoundResponse,
  conflictResponse,
} = require("../utils/responseUtils");
const { ValidationError } = require("sequelize");

const getRolesList = async (req = request, res = response) => {
  const roles = await Rol.findAll({ order: ["id"] });
  return res.status(200).json(roles);
};

const getRolById = async (req = request, res = response) => {
  const id = req.params.id;

  const role = await Rol.findByPk(id);

  if (role === null) {
    return notFoundResponse(res, `Rol no encontrado.`);
  }

  return res.status(200).json(role);
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
      return conflictResponse(res, "No se pudo crear el rol");
    }
  }

  return res.status(201).json(role);
};

const updateRol = async (req = request, res = response) => {
  const { nombre, descripcion, isActive } = req.body;
  const id = req.params.id;

  // Recuperar el usuario previo a actualizar su informacion:
  const role = await Rol.findByPk(id);
  if (role === null) {
    return notFoundResponse(res, "Rol no encontrado");
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

  return res.status(200).json(role);
};

const deleteRol = async (req = request, res = response) => {
  const id = req.params.id;
  const role = await Rol.findByPk(id);
  if (role === null) {
    return notFoundResponse(res, "Rol no encontrado");
  }
  role.destroy();

  return res.status(204).json();
};

module.exports = { getRolesList, getRolById, createRol, updateRol, deleteRol };
