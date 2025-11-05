"use strict";

const { StatusCodes } = require("http-status-codes");

const AppError = require("./AppError");
const { Rol } = require("../models");

/**
 * RolesService centraliza la lógica relacionada con roles.
 */
class RolesService {
  async list() {
    return Rol.findAll({ order: ["id"] });
  }

  async getById(id) {
    const role = await Rol.findByPk(id);

    if (!role) {
      throw new AppError("Rol no encontrado.", StatusCodes.NOT_FOUND);
    }

    return role;
  }

  async create({ nombre, descripcion }) {
    try {
      const role = await Rol.create({
        nombre,
        descripcion,
        isActive: true,
      });

      return role;
    } catch (error) {
      throw new AppError(
        "No se pudo crear el rol.",
        StatusCodes.CONFLICT,
        error
      );
    }
  }

  async update(id, { nombre, descripcion, isActive }) {
    const role = await Rol.findByPk(id);
    if (!role) {
      throw new AppError("Rol no encontrado.", StatusCodes.NOT_FOUND);
    }

    if (nombre !== undefined) {
      role.nombre = nombre;
    }

    if (descripcion !== undefined) {
      role.descripcion = descripcion;
    }

    if (isActive !== undefined) {
      role.isActive = isActive;
    }

    try {
      await role.save();
      return role;
    } catch (error) {
      throw new AppError(
        "No se pudo actualizar el rol.",
        StatusCodes.CONFLICT,
        error
      );
    }
  }

  async delete(id) {
    const role = await Rol.findByPk(id);

    if (!role) {
      throw new AppError("Rol no encontrado.", StatusCodes.NOT_FOUND);
    }

    try {
      await role.destroy();
    } catch (error) {
      throw new AppError(
        "No se pudo eliminar el rol.",
        StatusCodes.CONFLICT,
        error
      );
    }
  }
}

module.exports = RolesService;
