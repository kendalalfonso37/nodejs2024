/** @type {import("express").RequestHandler} */

const { usuario, rol } = require("./../models/index");
const { request, response } = require("express");
const { notFoundResponse } = require("../utils/responseUtils");

const getUsuarioRoles = async (req = request, res = response) => {
  const usuarioId = req.params.id;

  const user = await usuario.findByPk(usuarioId, {
    include: {
      model: rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });

  if (!user) {
    return notFoundResponse(res, `Usuario no encontrado`);
  }

  const roles = user.rols; // al hacer la union lo deja con el plural de rols

  return res.status(200).json(roles ?? []); // Devuelve un array vacio en caso que roles sea undefined o null
};

const createUsuarioRole = async (req = request, res = response) => {
  const usuario_id = req.params.id;
  const { rol_id } = req.body;

  // Validar que el usuario y el rol existan en BD:
  var user = await usuario.findByPk(usuario_id, {
    include: {
      model: rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });
  if (user === null) return notFoundResponse(res, `Usuario no encontrado`); // Abreviatura para no poner llaves si el if solo tiene una instruccion.

  const role = await rol.findByPk(rol_id);
  if (role === null) return notFoundResponse(res, `Rol no encontrado`);

  await user.addRol(role); // Agregamos el rol al usuario con el metodo addRol

  user = await usuario.findByPk(usuario_id, {
    include: {
      model: rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });

  return res.status(201).json(user.rols);
};

const deleteUsuarioRole = async (req = request, res = response) => {
  const usuario_id = req.params.id;
  const { rol_id } = req.body;

  // Validar que el usuario y el rol existan en BD:
  const user = await usuario.findByPk(usuario_id, {
    include: {
      model: rol,
      through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
    },
  });
  if (user === null) return notFoundResponse(res, `Usuario no encontrado`); // Abreviatura para no poner llaves si el if solo tiene una instruccion.

  const role = await rol.findByPk(rol_id);
  if (role === null) return notFoundResponse(res, `Rol no encontrado`);

  await user.removeRol(role); // Eliminamos el rol al usuario con el metodo removeRol

  return res.status(204).json();
};

module.exports = { getUsuarioRoles, createUsuarioRole, deleteUsuarioRole };
