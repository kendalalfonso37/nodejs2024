"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rol.belongsToMany(models.Usuario, {
        through: models.UsuarioRol,
        foreignKey: "rolId", // Clave foránea en usuario_rol que hace referencia a rol
        otherKey: "usuarioId", // Clave foránea en usuario_rol que hace referencia a usuario
      });
    }
  }
  Rol.init(
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
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Rol",
      name: {
        singular: "Rol",
        plural: "Roles",
      },
      tableName: "roles",
    }
  );
  return Rol;
};
