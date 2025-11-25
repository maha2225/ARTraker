'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdherenceRecord extends Model {
    static associate(models) {
      AdherenceRecord.belongsTo(models.User, { foreignKey: 'userId' });
      // Optional: if tied to prescription
      AdherenceRecord.belongsTo(models.Prescription, { foreignKey: 'prescriptionId' });
    }
  }

  AdherenceRecord.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prescriptionId: {
      type: DataTypes.INTEGER,
      allowNull: true,  // optional, if summary is for all meds
    },
    month: {
      type: DataTypes.STRING,  // e.g., '2025-11' to identify month
      allowNull: false,
    },
    monthlyAdherenceRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Poor', 'Fair', 'Good', 'Excellent'),
      allowNull: false,
    },
    daysMissed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    primaryBarriers: DataTypes.TEXT,
    lastClinicVisit: DataTypes.DATEONLY,
    nextAppointment: DataTypes.DATEONLY,
    notes: DataTypes.TEXT,  // optional extra info
  }, {
    sequelize,
    modelName: 'AdherenceRecord',
  });

  return AdherenceRecord;
};
