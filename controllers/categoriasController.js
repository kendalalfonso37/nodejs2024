const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const { notFoundResponse } = require("../utils/responseUtils");

const { Categoria } = require("./../models/index");

const getGategoriasList = async (req = request, res = response) => {
  const categorias = await Categoria.findAll({ order: ["id"] });
  return res.status(StatusCodes.OK).json(categorias);
};

const getCategoriaById = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByPk(id);
  if (!categoria) {
    return notFoundResponse(res, `Categoria no encontrada`);
  }
  return res.status(StatusCodes.OK).json(categoria);
};

module.exports = { getGategoriasList, getCategoriaById };
