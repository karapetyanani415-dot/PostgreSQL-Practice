const { Account, Transaction } = require('../models');

const createAccount = async (req, res, next) => {
  try {
    const { customerId, currency } = req.body;

    const account = await Account.create({
      customer_id: customerId,
      currency,
    });

    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

const getAccountById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
};

const updateAccountStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    account.status = status;

    await account.save();

    res.json(account);
  } catch (error) {
    next(error);
  }
};

const deposit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, reference, note } = req.body;

    if (amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be greater than 0',
      });
    }

    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    if (account.status !== 'active') {
      return res.status(400).json({
        message: 'Account is not active',
      });
    }

    account.balance = Number(account.balance) + Number(amount);

    await account.save();

    await Transaction.create({
      type: 'deposit',
      from_account_id: null,
      to_account_id: account.id,
      amount,
      reference,
      note,
    });

    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

const withdraw = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, reference, note } = req.body;

    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    if (account.status !== 'active') {
      return res.status(400).json({
        message: 'Account is not active',
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be greater than 0',
      });
    }

    if (Number(amount) > Number(account.balance)) {
      return res.status(400).json({
        message: 'Insufficient balance',
      });
    }

    account.balance = Number(account.balance) - Number(amount);

    await account.save();

    await Transaction.create({
      type: 'withdraw',
      from_account_id: account.id,
      to_account_id: null,
      amount,
      reference,
      note,
    });

    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccount,
  getAccountById,
  updateAccountStatus,
  deposit,
  withdraw,
};