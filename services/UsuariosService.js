"use strict";

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const AppError = require("./AppError");
const { Usuario } = require("../models");

/**
 * UsuariosService concentra la lógica de negocio relacionada a usuarios.
 */
class UsuariosService {
  /**
   * Obtiene la lista completa de usuarios.
   * @returns {Promise<Array>} Lista de usuarios (incluye hash de contraseña como en la implementación original).
   */
  async list() {
    return Usuario.findAll({ order: ["id"] });
  }

  /**
   * Busca un usuario por id y excluye el campo password en la respuesta.
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const user = await Usuario.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new AppError("Usuario no encontrado.", StatusCodes.NOT_FOUND);
    }

    return user;
  }

  /**
   * Crea un nuevo usuario después de validar unicidad de email.
   * @param {{username: string, email: string, password: string}} payload
   * @returns {Promise<Object>} Usuario creado sin exponer password.
   */
  async create({ username, email, password }) {
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError("El correo ya está en uso.", StatusCodes.BAD_REQUEST);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Usuario.create({
        username,
        email,
        password: hashedPassword,
      });

      const plainUser = user.toJSON();
      delete plainUser.password;

      return plainUser;
    } catch (error) {
      throw new AppError(
        "No se pudo crear el usuario.",
        StatusCodes.CONFLICT,
        error
      );
    }
  }

  /**
   * Actualiza un usuario con validaciones de unicidad y hash de contraseña.
   * @param {number|string} id
   * @param {{username?: string, email?: string, password?: string, isActive?: boolean}} payload
   * @returns {Promise<Object>} Usuario actualizado sin exponer password.
   */
  async update(id, { username, email, password, isActive }) {
    const user = await Usuario.findByPk(id);
    if (!user) {
      throw new AppError("Usuario no encontrado.", StatusCodes.NOT_FOUND);
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (email !== undefined) {
      const existingUser = await Usuario.findOne({ where: { email } });

      if (existingUser && existingUser.id !== user.id) {
        throw new AppError("El correo ya está en uso.", StatusCodes.BAD_REQUEST);
      }

      user.email = email;
    }

    if (password !== undefined) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (isActive !== undefined) {
      user.isActive = isActive;
    }

    try {
      await user.save();
    } catch (error) {
      throw new AppError(
        "No se pudo actualizar el usuario.",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
    }

    const plainUser = user.toJSON();
    delete plainUser.password;

    return plainUser;
  }

  /**
   * Elimina un usuario existente.
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const user = await Usuario.findByPk(id);
    if (!user) {
      throw new AppError("Usuario no encontrado.", StatusCodes.NOT_FOUND);
    }

    try {
      await user.destroy();
    } catch (error) {
      throw new AppError(
        "No se pudo eliminar el usuario.",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}

module.exports = UsuariosService;
