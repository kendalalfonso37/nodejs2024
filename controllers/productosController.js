const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");

const { internalServerErrorResponse } = require("../utils/responseUtils");
const { Producto } = require("./../models/index");

const getProductos = async (req = request, res = response) => {
  try {
    const productos = await Producto.findAll({ order: ["id"] });
    return res.status(StatusCodes.OK).json(productos);
  } catch (error) {
    console.log(error);
    internalServerErrorResponse(
      res,
      "No se pudo obtener la lista de productos."
    );
  }
};

const getProductoById = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Producto no encontrado" });
    }
    return res.status(StatusCodes.OK).json(producto);
  } catch (error) {
    console.log(error);
    internalServerErrorResponse(res, "No se pudo obtener el producto.");
  }
};

const createProducto = async (req = request, res = response) => {
  const {
    nombre,
    descripcion,
    precioPorUnidad,
    precioUnitario,
    unidadesEnStock,
    unidadesEnOrden,
    categoriaId,
  } = req.body;

  try {
    const producto = await Producto.create({
      nombre,
      descripcion,
      precioPorUnidad,
      precioUnitario,
      unidadesEnStock,
      unidadesEnOrden,
      categoriaId,
      isActive: true,
    });

    return res.status(StatusCodes.CREATED).json(producto);
  } catch (error) {
    console.log(error);
    internalServerErrorResponse(res, "No se pudo crear el producto.");
  }
};

const updateProducto = async (req = request, res = response) => {
  const {
    nombre,
    descripcion,
    precioPorUnidad,
    precioUnitario,
    unidadesEnStock,
    unidadesEnOrden,
    categoriaId,
    isActive,
  } = req.body;
  const id = req.params.id;

  try {
    const producto = await Producto.findByPk(id);

    if (producto === null) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Producto no encontrado." });
    }

    const categoriaIdExists = await Producto.findOne({
      where: { id: categoriaId },
    });

    if (!categoriaIdExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "La categoriaId proporcionada no existe." });
    }

    // Validaciones
    if (nombre !== undefined) {
      producto.nombre = nombre;
    }
    if (descripcion !== undefined) {
      producto.descripcion = descripcion;
    }
    if (precioPorUnidad !== undefined) {
      producto.precioPorUnidad = precioPorUnidad;
    }
    if (precioUnitario !== undefined) {
      producto.precioUnitario = precioUnitario;
    }
    if (unidadesEnStock !== undefined) {
      producto.unidadesEnStock = unidadesEnStock;
    }
    if (unidadesEnOrden !== undefined) {
      producto.unidadesEnOrden = unidadesEnOrden;
    }
    if (categoriaId !== undefined) {
      producto.categoriaId = categoriaId;
    }
    if (isActive !== undefined) {
      producto.isActive = isActive;
    }

    await producto.save();

    return res.status(StatusCodes.OK).json(producto);
  } catch (error) {
    console.log(error);
    internalServerErrorResponse(res, "No se pudo actualizar el producto.");
  }
};

const deleteProducto = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Producto no encontrado." });
    }

    await producto.destroy();

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    internalServerErrorResponse(res, "No se pudo eliminar el producto.");
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
