const sequelize = require('../config/database');
const { Account, Transaction, AuditLog } = require('../models');

const transfer = async ({
  fromAccountId,
  toAccountId,
  amount,
  reference,
  note,
}) => {
  return await sequelize.transaction(async (t) => {
    const fromAccount = await Account.findByPk(fromAccountId, {
      transaction: t,
    });

    const toAccount = await Account.findByPk(toAccountId, {
      transaction: t,
    });

    if (!fromAccount || !toAccount) {
      throw new Error('One or both accounts not found');
    }

    if (fromAccountId === toAccountId) {
      throw new Error('Transfer accounts must be different');
    }

    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    if (fromAccount.status !== 'active' || toAccount.status !== 'active') {
      throw new Error('Both accounts must be active');
    }

    if (fromAccount.currency !== toAccount.currency) {
      throw new Error('Accounts must have the same currency');
    }

    if (Number(fromAccount.balance) < Number(amount)) {
      throw new Error('Insufficient balance');
    }

    fromAccount.balance = Number(fromAccount.balance) - Number(amount);
    toAccount.balance = Number(toAccount.balance) + Number(amount);

    await fromAccount.save({ transaction: t });
    await toAccount.save({ transaction: t });

    const transaction = await Transaction.create(
      {
        type: 'transfer',
        from_account_id: fromAccount.id,
        to_account_id: toAccount.id,
        amount,
        reference,
        note,
      },
      {
        transaction: t,
      },
    );
    await AuditLog.create(
      {
        action: 'transfer',
        meta: {
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id,
          amount,
          reference,
        },
      },
      {
        transaction: t,
      },
    );
    return {
      fromAccount,
      toAccount,
      transaction,
    };
  });
};

module.exports = transfer;
