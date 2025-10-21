"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rol.belongsToMany(models.usuario, {
        through: models.usuario_rol,
        foreignKey: "rol_id", // Clave foránea en usuario_rol que hace referencia a rol
        otherKey: "usuario_id", // Clave foránea en usuario_rol que hace referencia a usuario
      });
    }
  }
  rol.init(
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
      is_active: {
        field: "is_active",
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "rol",
      tableName: "roles",
    }
  );
  return rol;
};
