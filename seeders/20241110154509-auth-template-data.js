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
      "usuarios",
      [
        {
          is_active: true,
          username: "testello",
          email: "testello@mail.com",
          password:
            "$2b$10$KEKgx8qDpSFqlhXHmfO4Q.L64eHrm5rFeEJAOkA5USrud3np43v6q", // testellopassword
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          is_active: true,
          username: "testello1",
          email: "testello1@mail.com",
          password:
            "$2b$10$KEKgx8qDpSFqlhXHmfO4Q.L64eHrm5rFeEJAOkA5USrud3np43v6q", // testellopassword
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          is_active: true,
          username: "testello2",
          email: "testello2@mail.com",
          password:
            "$2b$10$KEKgx8qDpSFqlhXHmfO4Q.L64eHrm5rFeEJAOkA5USrud3np43v6q", // testellopassword
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          nombre: "ROLE_ADMIN",
          descripcion: "Administrador",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "ROLE_USER",
          descripcion: "Usuario",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "ROLE_DUMMY",
          descripcion: "Dummy",
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
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
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
