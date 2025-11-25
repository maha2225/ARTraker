'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdherenceRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      prescriptionId: {
        type: Sequelize.INTEGER,
        allowNull: true,  // optional
        references: { model: 'Prescriptions', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false, // e.g., '2025-11'
      },
      monthlyAdherenceRate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Poor', 'Fair', 'Good', 'Excellent'),
        allowNull: false,
      },
      daysMissed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      primaryBarriers: {
        type: Sequelize.TEXT,
      },
      lastClinicVisit: {
        type: Sequelize.DATEONLY,
      },
      nextAppointment: {
        type: Sequelize.DATEONLY,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AdherenceRecords');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_AdherenceRecords_status";'
    );
  },
};
