const Customer = require('./Customer');
const Account = require('./Account');
const Transaction = require('./Transaction');
const AuditLog = require('./AuditLog');

Customer.hasMany(Account, {
  foreignKey: 'customer_id',
});

Account.belongsTo(Customer, {
  foreignKey: 'customer_id',
});

Account.hasMany(Transaction, {
  as: 'outgoingTransactions',
  foreignKey: 'from_account_id',
});

Account.hasMany(Transaction, {
  as: 'incomingTransactions',
  foreignKey: 'to_account_id',
});

Transaction.belongsTo(Account, {
  as: 'fromAccount',
  foreignKey: 'from_account_id',
});

Transaction.belongsTo(Account, {
  as: 'toAccount',
  foreignKey: 'to_account_id',
});

module.exports = {
  Customer,
  Account,
  Transaction,
  AuditLog,
};