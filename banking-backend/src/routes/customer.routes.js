const express = require('express');

const {
  createCustomer,
  getCustomerById,
} = require('../controllers/customer.controller');

const router = express.Router();

router.post('/customers', createCustomer);

router.get('/customers/:id', getCustomerById);

module.exports = router;
