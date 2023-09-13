'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('user', {
      fields: ['departmentId'],
      type: 'foreign key',
      name: 'fk_user_departmentId',
      references: {
        table: 'department', // This references the 'departments' table
        field: 'id',
      },
      onDelete: 'cascade', // Cascade deletion of users when a department is deleted
      onUpdate: 'cascade', // Cascade update of departmentId when department id is updated
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user', 'fk_user_departmentId');
  }
};
