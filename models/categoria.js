"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categoria.hasMany(models.Producto, {
        foreignKey: "categoria_id",
      });
    }
  }
  Categoria.init(
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
      modelName: "Categoria",
      name: {
        singular: "Categoria",
        plural: "Categorias",
      },
      tableName: "categorias",
    }
  );
  return Categoria;
};
