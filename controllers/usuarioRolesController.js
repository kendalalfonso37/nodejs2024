/** @type {import("express").RequestHandler} */

const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");

const { Usuario, Rol } = require("./../models/index");
const {
  notFoundResponse,
  internalServerErrorResponse,
} = require("../utils/responseUtils");

const getUsuarioRoles = async (req = request, res = response) => {
  const usuarioId = req.params.id;

  try {
    const user = await Usuario.findByPk(usuarioId, {
      include: {
        model: Rol,
        through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
      },
    });

    if (!user) {
      return notFoundResponse(res, `Usuario no encontrado.`);
    }

    const roles = user.Roles; // al hacer la union lo deja con el plural de Roles, tal como hemos definido en el Modelo Roles dentro del objeto name: {}

    return res.status(StatusCodes.OK).json(roles ?? []); // Devuelve un array vacio en caso que roles sea undefined o null
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(
      res,
      "No se pudo obtener los roles del usuario."
    );
  }
};

const createUsuarioRole = async (req = request, res = response) => {
  const usuarioId = req.params.id;
  const { rolId } = req.body;

  try {
    // Validar que el usuario y el rol existan en BD:
    var user = await Usuario.findByPk(usuarioId, {
      include: {
        model: Rol,
        through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
      },
    });

    if (user === null) {
      return notFoundResponse(res, `Usuario no encontrado.`);
    }

    const role = await Rol.findByPk(rolId);
    if (role === null) {
      return notFoundResponse(res, `Rol no encontrado.`);
    }

    await user.addRol(role); // Agregamos el rol al usuario con el metodo addRol

    user = await Usuario.findByPk(usuarioId, {
      include: {
        model: Rol,
        through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
      },
    });

    return res.status(StatusCodes.CREATED).json(user.Roles);
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(
      res,
      "No se pudo asignar el rol al usuario."
    );
  }
};

const deleteUsuarioRole = async (req = request, res = response) => {
  const usuarioId = req.params.id;
  const { rolId } = req.body;

  try {
    // Validar que el usuario y el rol existan en BD:
    const user = await Usuario.findByPk(usuarioId, {
      include: {
        model: Rol,
        through: { attributes: [] }, // Esto omite los atributos de la tabla intermedia,
      },
    });
    if (user === null) {
      return notFoundResponse(res, `Usuario no encontrado.`);
    }

    const role = await Rol.findByPk(rolId);
    if (role === null) {
      return notFoundResponse(res, `Rol no encontrado.`);
    }

    await user.removeRol(role); // Eliminamos el rol al usuario con el metodo removeRol

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(
      res,
      "No se pudo eliminar el rol del usuario."
    );
  }
};

module.exports = {
  getUsuarioRoles,
  createUsuarioRole,
  deleteUsuarioRole,
};
