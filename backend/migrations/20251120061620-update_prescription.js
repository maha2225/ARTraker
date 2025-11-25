'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      counselorId: {
        type: Sequelize.INTEGER,
        references: { model: 'Counselors', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      medicationId: {
        type: Sequelize.INTEGER,
        references: { model: 'Medications', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      startDate: { type: Sequelize.DATEONLY },
      endDate: { type: Sequelize.DATEONLY },
      dosage: { type: Sequelize.STRING },

      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prescriptions');
  }
};
