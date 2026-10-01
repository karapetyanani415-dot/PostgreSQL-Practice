const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const AuditLog = sequelize.define(
  'AuditLog',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    action: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    meta: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    tableName: 'audit_logs',
    timestamps: false,
  },
);

module.exports = AuditLog;