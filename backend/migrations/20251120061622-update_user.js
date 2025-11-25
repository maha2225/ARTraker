'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false, unique: true },
      age: { type: Sequelize.INTEGER, allowNull: false },

      gender: { 
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false
      },

      counselorId: {
        type: Sequelize.INTEGER,
        references: { model: 'Counselors', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },

      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_status";');
  }
};
