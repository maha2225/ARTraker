'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    static associate(models) {
      Medication.hasMany(models.Prescription, { foreignKey: 'medicationId' });
    }
  }

  Medication.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      dosage: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Medication',
    }
  );

  return Medication;
};
