'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create a new 'departmentId' column with the integer data type
    await queryInterface.addColumn('employee', 'departmentId', {
      type: Sequelize.INTEGER,
      allowNull: false, // You can change this to true if necessary
    });

    // Update the 'departmentId' column with converted data from the 'department' column
    await queryInterface.sequelize.query(`
      UPDATE "employee" SET "departmentId" = CAST("department" AS INTEGER);
    `);

    // Remove the old 'department' column
    await queryInterface.removeColumn('employee', 'department');
  },

  async down(queryInterface, Sequelize) {
    // Reverse the changes if needed

    // Add back the 'department' column
    await queryInterface.addColumn('employee', 'department', {
      type: Sequelize.STRING,
    });

    // Update the 'department' column with converted data from the 'departmentId' column
    await queryInterface.sequelize.query(`
      UPDATE "employee" SET "department" = "departmentId"::TEXT;
    `);

    // Remove the 'departmentId' column
    await queryInterface.removeColumn('employee', 'departmentId');
  },
};
