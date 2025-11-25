'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    static associate(models) {
      Prescription.belongsTo(models.User, { foreignKey: 'userId' });
      Prescription.belongsTo(models.Counselor, { foreignKey: 'counselorId' });
      Prescription.belongsTo(models.Medication, { foreignKey: 'medicationId' });
      Prescription.hasMany(models.AdherenceRecord, { foreignKey: 'prescriptionId' });
    }
  }
  Prescription.init({
    userId: DataTypes.INTEGER,
    counselorId: DataTypes.INTEGER,
    medicationId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    dosage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prescription',
  });
  return Prescription;
};
