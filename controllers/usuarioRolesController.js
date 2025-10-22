/** @type {import("express").RequestHandler} */

const { Usuario, Rol } = require("./../models/index");
const { request, response } = require("express");
const { notFoundResponse } = require("../utils/responseUtils");

const getUsuarioRoles = async (req = request, res = response) => {
  const usuarioId = req.params.id;

  const user = await Usuario.findByPk(usuarioId, {
    include: {
      model: Rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });

  if (!user) {
    return notFoundResponse(res, `Usuario no encontrado`);
  }

  const roles = user.Roles; // al hacer la union lo deja con el plural de Roles, tal como hemos definido en el Modelo Roles dentro del objeto name: {}

  return res.status(200).json(roles ?? []); // Devuelve un array vacio en caso que roles sea undefined o null
};

const createUsuarioRole = async (req = request, res = response) => {
  const usuario_id = req.params.id;
  const { rol_id } = req.body;

  // Validar que el usuario y el rol existan en BD:
  var user = await Usuario.findByPk(usuario_id, {
    include: {
      model: Rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });
  if (user === null) return notFoundResponse(res, `Usuario no encontrado`); // Abreviatura para no poner llaves si el if solo tiene una instruccion.

  const role = await Rol.findByPk(rol_id);
  if (role === null) return notFoundResponse(res, `Rol no encontrado`);

  await user.addRol(role); // Agregamos el rol al usuario con el metodo addRol

  user = await Usuario.findByPk(usuario_id, {
    include: {
      model: Rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });

  return res.status(201).json(user.Roles);
};

const deleteUsuarioRole = async (req = request, res = response) => {
  const usuario_id = req.params.id;
  const { rol_id } = req.body;

  // Validar que el usuario y el rol existan en BD:
  const user = await Usuario.findByPk(usuario_id, {
    include: {
      model: Rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });
  if (user === null) return notFoundResponse(res, `Usuario no encontrado`); // Abreviatura para no poner llaves si el if solo tiene una instruccion.

  const role = await Rol.findByPk(rol_id);
  if (role === null) return notFoundResponse(res, `Rol no encontrado`);

  await user.removeRol(role); // Eliminamos el rol al usuario con el metodo removeRol

  return res.status(204).json();
};

module.exports = { getUsuarioRoles, createUsuarioRole, deleteUsuarioRole };
