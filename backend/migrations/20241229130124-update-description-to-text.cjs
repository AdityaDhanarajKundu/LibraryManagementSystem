'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Books", "description", {
      type: Sequelize.TEXT,
      allowNull: true, // You can change this to false if description is mandatory
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Books", "description", {
      type: Sequelize.STRING(255),
      allowNull: true, // Revert to what it was originally
    });
  }
};
