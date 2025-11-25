'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counselor extends Model {
    static associate(models) {
      
      Counselor.hasMany(models.User, { foreignKey: 'counselorId' });
      Counselor.hasMany(models.Prescription, { foreignKey: 'counselorId' });
    }
  }
  Counselor.init({
    name: { type: DataTypes.STRING, allowNull: false },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Counselor',
  });
  return Counselor;
};
