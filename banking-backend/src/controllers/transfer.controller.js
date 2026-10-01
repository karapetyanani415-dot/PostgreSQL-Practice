const transfer = require('../services/transfer.service');

const createTransfer = async (req, res, next) => {
  try {
    const result = await transfer(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransfer,
};