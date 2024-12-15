"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove index "email_35" from "users" table
    await queryInterface.removeIndex("users", "email_35");
  },

  async down(queryInterface, Sequelize) {
    // Add a unique index on the "email" column of the "users" table
    await queryInterface.addIndex("users", ["email"], { unique: true });
  },
};
