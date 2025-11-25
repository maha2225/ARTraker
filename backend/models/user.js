'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
      User.belongsTo(models.Counselor, { foreignKey: 'counselorId' });
      User.hasMany(models.Prescription, { foreignKey: 'userId' });
      User.hasMany(models.AdherenceRecord, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      phone: {type: DataTypes.STRING, allowNull: false },
      age: DataTypes.INTEGER,
      gender: { 
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false
     },

      counselorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Counselors', key: 'id' }
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
