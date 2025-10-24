"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsTo(models.Categoria, {
        foreignKey: "categoria_id",
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      });
    }
  }
  Producto.init(
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nombre: {
        field: "nombre",
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        field: "descripcion",
        type: DataTypes.STRING,
        allowNull: false,
      },
      precioPorUnidad: {
        field: "precio_por_unidad",
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      precioUnitario: {
        field: "precio_unitario",
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      unidadesEnStock: {
        field: "unidades_en_stock",
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      unidadesEnOrden: {
        field: "unidades_en_orden",
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      categoriaId: {
        field: "categoria_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categorias",
          key: "id",
        },
      },
      isActive: {
        field: "is_active",
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Producto",
      name: {
        singular: "Producto",
        plural: "Productos",
      },
      tableName: "productos",
    }
  );
  return Producto;
};
