"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "categorias",
      [
        {
          id: 1,
          nombre: "Electrónica",
          descripcion: "Dispositivos electrónicos y gadgets",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          nombre: "Ropa",
          descripcion: "Prendas de vestir para todas las edades",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          nombre: "Hogar",
          descripcion: "Artículos para el hogar y decoración",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "productos",
      [
        {
          nombre: "Smartphone XYZ",
          descripcion:
            "Un smartphone de última generación con múltiples funciones.",
          precio_por_unidad: 699.99,
          precio_unitario: 699.99,
          unidades_en_stock: 50,
          unidades_en_orden: 10,
          categoria_id: 1,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nombre: "Camiseta Casual",
          descripcion: "Camiseta cómoda y estilizada para uso diario.",
          precio_por_unidad: 19.99,
          precio_unitario: 19.99,
          unidades_en_stock: 200,
          unidades_en_orden: 50,
          categoria_id: 2,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nombre: "Lámpara de Mesa",
          descripcion:
            "Lámpara elegante para iluminar tu espacio de trabajo o lectura.",
          precio_por_unidad: 49.99,
          precio_unitario: 49.99,
          unidades_en_stock: 80,
          unidades_en_orden: 20,
          categoria_id: 3,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("productos", null, {});
    await queryInterface.bulkDelete("categorias", null, {});
  },
};
