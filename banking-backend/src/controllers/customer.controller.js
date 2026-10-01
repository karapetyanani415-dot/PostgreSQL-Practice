const { Customer, Account } = require('../models');

const createCustomer = async (req, res, next) => {
  try {
    const { fullName, email, phone } = req.body;

    const customer = await Customer.create({
      fullName,
      email,
      phone,
    });

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByPk(id, {
      include: [
        {
          model: Account,
        },
      ],
    });

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found',
      });
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
};