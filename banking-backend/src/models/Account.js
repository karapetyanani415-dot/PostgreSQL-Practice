const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./Customer');

const Account = sequelize.define(
  'Account',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'customer_id',
      references: { model: 'customers', key: 'id' },
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { isIn: [['AMD', 'USD', 'EUR']] },
    },
    balance: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'active',
      validate: { isIn: [['active', 'frozen', 'closed']] },
    },
  },
  {
    tableName: 'accounts',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

Customer.hasMany(Account, { foreignKey: 'customerId', as: 'accounts' });
Account.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

module.exports = Account;
