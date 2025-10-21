"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuario_roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Otra manera de crear constraints a la base de datos.
        // references: {
        //   model: "usuarios",
        //   key: "id",
        // },
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Otra manera de crear constraints a la base de datos.
        // references: {
        //   model: "roles",
        //   key: "id",
        // },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addConstraint("usuario_roles", {
      fields: ["usuario_id"],
      type: "foreign key",
      name: "fk_usuario_roles_usuarios",
      references: {
        table: "usuarios",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("usuario_roles", {
      fields: ["rol_id"],
      type: "foreign key",
      name: "fk_usuario_roles_roles",
      references: {
        table: "roles",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuario_roles");
  },
};
