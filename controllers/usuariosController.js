/** @type {import("express").RequestHandler} */

const bcrypt = require("bcrypt");
const { Usuario } = require("./../models/index");
const { request, response } = require("express");
const {
  notFoundResponse,
  conflictResponse,
} = require("../utils/responseUtils");
const { ValidationError } = require("sequelize");

const getUsuariosList = async (req = request, res = response) => {
  const users = await Usuario.findAll({ order: ["id"] });
  return res.status(200).json(users);
};

const getUsuarioById = async (req = request, res = response) => {
  const id = req.params.id;

  const user = await Usuario.findByPk(id, {
    attributes: { exclude: ["password"] }, // No queremos que se devuelva tambien el password del usuario, verdad?
  });

  if (user === null) {
    return notFoundResponse(res, "Usuario no encontrado");
  }
  return res.status(200).json(user);
};

const createUsuario = async (req = request, res = response) => {
  const { username, email, password: plainPassword } = req.body;

  // Encriptar la contraseña
  const password = await bcrypt.hash(plainPassword, 10);

  let user;
  // Crear el nuevo usuario
  try {
    user = await Usuario.create({
      username,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return conflictResponse(res, "No se pudo crear el usuario");
    }
  }

  // Quitar el password para este user, mismo caso: ocultamos de la response el password.
  user.password = undefined;

  return res.status(201).json(user);
};

const updateUsuario = async (req = request, res = response) => {
  const { username, email, password, isActive } = req.body;
  const id = req.params.id;

  // Recuperar el usuario previo a actualizar su informacion:
  const user = await Usuario.findByPk(id);
  if (user === null) {
    return notFoundResponse(res, "Usuario no encontrado");
  }

  // Validaciones
  // is username is not null actualizarlo:
  if (username !== undefined) {
    user.username = username;
  }

  // email nuevo no existe?
  const existingUser = await Usuario.findOne({ where: { email } });

  if (existingUser) {
    // Hay un usuario que tiene este correo actualmente
    if (existingUser.id !== user.id) {
      // Validamos si este usuario es el mismo, si NO es asi, retornamos el error.
      return res.status(400).json({ message: "El correo ya está en uso" });
    }
  } else {
    user.email = email;
  }

  // password a actualizar?
  if (password !== undefined) {
    user.password = await bcrypt.hash(password, 10);
  }

  if (isActive !== undefined) {
    user.isActive = isActive;
  }

  await user.save();
  user.password = undefined;

  return res.status(200).json(user);
};

const deleteUsuario = async (req = request, res = response) => {
  const id = req.params.id;
  const user = await Usuario.findByPk(id);
  if (user === null) {
    return notFoundResponse(res, "Usuario no encontrado");
  }
  await user.destroy();

  return res.status(204).json();
};

module.exports = {
  getUsuariosList,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
