"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("productos", {
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
      precioPorUnidad: {
        field: "precio_por_unidad",
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      precioUnitario: {
        field: "precio_unitario",
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unidadesEnStock: {
        field: "unidades_en_stock",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      unidadesEnOrden: {
        field: "unidades_en_orden",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isActive: {
        field: "is_active",
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      categoriaId: {
        field: "categoria_id",
        type: Sequelize.INTEGER,
        allowNull: false,
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
      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    // Constraints
    await queryInterface.addConstraint("productos", {
      fields: ["categoria_id"],
      type: "foreign key",
      name: "fk_productos_categorias",
      references: {
        table: "categorias",
        field: "id",
      },
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("productos");
  },
};
