"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UsuarioRol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioRol.init(
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      usuarioId: {
        field: "usuario_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      rolId: {
        field: "rol_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      paranoid: false,
      sequelize,
      modelName: "UsuarioRol",
      name: {
        singular: "UsuarioRol",
        plural: "UsuarioRoles",
      },
      tableName: "usuario_roles",
    }
  );
  return UsuarioRol;
};
