"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      id: {
        field: "id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        field: "nombre",
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        field: "descripcion",
        type: Sequelize.STRING,
        allowNull: false,
      },
      isActive: {
        field: "is_active",
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roles");
  },
};
