"use strict";

const { StatusCodes, ReasonPhrases } = require("http-status-codes");

/**
 * AppError encapsula los errores de negocio lanzados por los servicios.
 * Incluye el código HTTP que debe propagarse al controlador.
 */
class AppError extends Error {
  /**
   * @param {string} message Mensaje claro para el cliente/LLM.
   * @param {number} [statusCode=StatusCodes.INTERNAL_SERVER_ERROR] Código HTTP asociado.
   * @param {Error} [originalError] Error original (opcional) para depuración.
   */
  constructor(
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    originalError
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

module.exports = AppError;
