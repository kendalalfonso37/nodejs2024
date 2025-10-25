const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");

const {
  notFoundResponse,
  conflictResponse,
  internalServerErrorResponse,
} = require("../utils/responseUtils");
const { Categoria } = require("./../models/index");

const getGategoriasList = async (req = request, res = response) => {
  try {
    const categorias = await Categoria.findAll({ order: ["id"] });
    return res.status(StatusCodes.OK).json(categorias);
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(
      res,
      "No se pudo obtener la lista de categorias."
    );
  }
};

const getCategoriaById = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return notFoundResponse(res, `Categoria no encontrada`);
    }
    return res.status(StatusCodes.OK).json(categoria);
  } catch (error) {
    console.log(error);
    return internalServerErrorResponse(res, "No se pudo obtener la categoria.");
  }
};

const createCategoria = async (req = request, res = response) => {
  const { nombre, descripcion } = req.body;

  try {
    const categoria = await Categoria.create({
      nombre,
      descripcion,
      isActive: true,
    });

    return res.status(StatusCodes.CREATED).json(categoria);
  } catch (error) {
    console.log(error);
    return conflictResponse(res, "No se pudo crear la categoria.");
  }
};

const updateCategoria = async (req = request, res = response) => {
  const { nombre, descripcion, isActive } = req.body;
  const id = req.params.id;

  try {
    const categoria = await Categoria.findByPk(id);

    if (categoria === null) {
      return notFoundResponse(res, "Categoria no encontrada.");
    }

    // Validaciones
    if (nombre !== undefined) {
      categoria.nombre = nombre;
    }
    if (descripcion !== undefined) {
      categoria.descripcion = descripcion;
    }
    if (isActive !== undefined) {
      categoria.isActive = isActive;
    }

    await categoria.save();

    return res.status(StatusCodes.OK).json(categoria);
  } catch (error) {
    console.log(error);
    return conflictResponse(res, "No se pudo actualizar la categoria.");
  }
};

const deleteCategoria = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria === null) {
      return notFoundResponse(res, "Categoria no encontrada.");
    }

    await categoria.destroy();

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    return conflictResponse(res, "No se pudo eliminar la categoria.");
  }
};

module.exports = {
  getGategoriasList,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
