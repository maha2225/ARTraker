'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Delete any existing admin first
    await queryInterface.bulkDelete('Counselors', { role: 'admin' });

    // Insert new admin
    return queryInterface.bulkInsert('Counselors', [
      {
        name: 'Super Admin',
        email: 'admin@artt.com',
        phone: '0000000000',
        role: 'admin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the admin
    return queryInterface.bulkDelete('Counselors', { role: 'admin' });
  }
};
