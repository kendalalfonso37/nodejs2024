"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usuario.belongsToMany(models.rol, {
        through: models.usuario_rol,
        foreignKey: "usuario_id", // Clave foránea en usuario_rol que hace referencia a usuario
        otherKey: "rol_id", // Clave foránea en usuario_rol que hace referencia a rol
      });
      usuario.hasMany(models.refresh_token, {
        foreignKey: "usuario_id",
      });
    }
  }
  usuario.init(
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        field: "username",
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        field: "email",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        field: "password",
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        field: "is_active",
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "usuario",
      tableName: "usuarios",
    }
  );
  return usuario;
};
