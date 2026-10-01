const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define(
  'Customer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'full_name',
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'customers',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

module.exports = Customer;
