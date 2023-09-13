'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('department', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // Bulk insert data into the "department" table
    await queryInterface.bulkInsert('department', [
      {
        name: 'HR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('department');
  }
};