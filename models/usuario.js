"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsToMany(models.Rol, {
        through: models.UsuarioRol,
        foreignKey: "usuarioId", // Clave foránea en UsuarioRol que hace referencia a usuario, las claves son del MODELO, no de la tabla.
        otherKey: "rolId", // Clave foránea en UsuarioRol que hace referencia a rol, las claves son del Modelo, no de la tabla.
      });
      Usuario.hasMany(models.RefreshToken, {
        foreignKey: "usuario_id",
      });
    }
  }
  Usuario.init(
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
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Usuario",
      name: {
        singular: "Usuario",
        plural: "Usuarios",
      },
      tableName: "usuarios",
    }
  );
  return Usuario;
};
