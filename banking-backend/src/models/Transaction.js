const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define(
  'Transaction',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdraw', 'transfer'),
      allowNull: false,
    },
    from_account_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
    to_account_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    reference: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    tableName: 'transactions',
    timestamps: false,
    validate: {
      transactionAccounts() {
        if (this.type === 'deposit') {
          if (this.to_account_id === null || this.from_account_id !== null) {
            throw new Error(
              'Deposit requires to_account_id and from_account_id must be NULL',
            );
          }
        }
        if (this.type === 'withdraw') {
          if (this.from_account_id === null || this.to_account_id !== null) {
            throw new Error(
              'Withdraw requires from_account_id and to_account_id must be NULL',
            );
          }
        }
        if (this.type === 'transfer') {
          if (this.from_account_id === null || this.to_account_id === null) {
            throw new Error('Transfer requires both account IDs');
          }

          if (this.from_account_id === this.to_account_id) {
            throw new Error('Transfer accounts must be different');
          }
        }
      },
    },
  },
);

module.exports = Transaction;
