"use strict";

const { StatusCodes } = require("http-status-codes");

const AppError = require("./AppError");
const { Usuario, Rol } = require("../models");

/**
 * UsuarioRolesService administra la asignación de roles a usuarios.
 */
class UsuarioRolesService {
  async listRolesForUser(usuarioId) {
    const user = await Usuario.findByPk(usuarioId, {
      include: {
        model: Rol,
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw new AppError("Usuario no encontrado.", StatusCodes.NOT_FOUND);
    }

    return user.Roles ?? [];
  }

  async addRoleToUser(usuarioId, rolId) {
    const user = await Usuario.findByPk(usuarioId, {
      include: {
        model: Rol,
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw new AppError("Usuario no encontrado.", StatusCodes.NOT_FOUND);
    }

    const role = await Rol.findByPk(rolId);
    if (!role) {
      throw new AppError("Rol no encontrado.", StatusCodes.NOT_FOUND);
    }

    try {
      await user.addRol(role);
      const updatedUser = await Usuario.findByPk(usuarioId, {
        include: {
          model: Rol,
          through: { attributes: [] },
        },
      });

      return updatedUser.Roles ?? [];
    } catch (error) {
      throw new AppError(
        "No se pudo asignar el rol al usuario.",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }

  async removeRoleFromUser(usuarioId, rolId) {
    const user = await Usuario.findByPk(usuarioId, {
      include: {
        model: Rol,
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw new AppError("Usuario no encontrado.", StatusCodes.NOT_FOUND);
    }

    const role = await Rol.findByPk(rolId);
    if (!role) {
      throw new AppError("Rol no encontrado.", StatusCodes.NOT_FOUND);
    }

    try {
      await user.removeRol(role);
    } catch (error) {
      throw new AppError(
        "No se pudo eliminar el rol del usuario.",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}

module.exports = UsuarioRolesService;
