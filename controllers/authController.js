/** @type {import("express").RequestHandler} */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

const { Usuario, RefreshToken } = require("./../models/index");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtUtils");
const {
  badRequestResponse,
  internalServerErrorResponse,
  unauthorizedResponse,
} = require("../utils/responseUtils");

const JTW_REFRESH_EXPIRATION_TIME =
  parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME) || 3600;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return badRequestResponse(res, "Usuario no Encontrado.");
    }

    // Verificar la contraseña (ejemplo con bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return badRequestResponse(res, "Contraseña incorrecta.");
    }

    // Generar accessToken y refreshToken
    const accessToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // Almacenar el refreshToken en Base de Datos.
    let expirationTime = new Date(
      Date.now() + 1 * (JTW_REFRESH_EXPIRATION_TIME * 1000)
    );

    await RefreshToken.create({
      refreshToken,
      usuarioId: user.id,
      issuedTime: new Date(),
      expirationTime,
    });

    return res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);

    return internalServerErrorResponse(
      res,
      "Error al momento de iniciar sesión."
    );
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el email ya existe
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return badRequestResponse(res, "El correo ya está en uso.");
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    await Usuario.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse(
      res,
      "Error al momento de registrar el usuario."
    );
  }
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  // Verificar si se proporcionó el refreshToken
  if (!refreshToken) {
    return unauthorizedResponse(res, "Refresh token no proporcionado.");
  }

  // Validaciones para RefreshToken
  try {
    // Verificar que el refreshToken fue firmado en nuestra API.
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Verificar si esta almacenado en base de datos el refreshToken.
    const refreshTokenInDb = await RefreshToken.findOne({
      where: { refreshToken },
    });

    // Si no existe el refreshToken en base de datos o si el expirationTime ya paso.
    if (!refreshTokenInDb) {
      return unauthorizedResponse(res, "Refresh token inválido o expirado.");
    }

    // Verificar si el token ya fue expirado.
    if (refreshTokenInDb.expirationTime < new Date()) {
      await refreshTokenInDb.destroy();
      return unauthorizedResponse(res, "Refresh token inválido o expirado.");
    }

    // Borramos todos los refreshTokens en Base de datos, por seguridad. Se puede implementar otra estrategia para invalidar refreshTokens.
    await refreshTokenInDb.destroy({ where: { userId: payload.id } });

    const accessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
    });

    // Generar un nuevo RefreshToken
    const newRefreshToken = generateRefreshToken({
      id: payload.id,
      email: payload.email,
    });

    // Almacenar el nuevo refreshToken en base de datos.
    let expirationTime = new Date(
      Date.now() + 1 * (JTW_REFRESH_EXPIRATION_TIME * 1000)
    );

    await RefreshToken.create({
      refreshToken: newRefreshToken,
      usuarioId: payload.id, // el payload del token tiene el id del usuario y el email.
      issuedTime: new Date(),
      expirationTime,
    });

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    return unauthorizedResponse(res, "Refresh token no válido.");
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  // Elimina los refresh token.
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Verificar si esta almacenado en base de datos el refreshToken.
    const refreshTokenInDb = await RefreshToken.findOne({
      where: { refreshToken },
    });

    if (!refreshTokenInDb) {
      return badRequestResponse(res, "Refresh token no válido.");
    }

    await refreshTokenInDb.destroy({ where: { userId: payload.id } });
  } catch (error) {
    console.log(error);
    return badRequestResponse(res, "Refresh token no válido.");
  }

  return res.json({ message: "Sesión cerrada." });
};

module.exports = { login, register, refreshAccessToken, logout };
