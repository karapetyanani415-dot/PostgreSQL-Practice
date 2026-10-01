const express = require('express');

const {
  createAccount,
  getAccountById,
  updateAccountStatus,
  deposit,
  withdraw,
} = require('../controllers/account.controller');

const router = express.Router();

router.post('/accounts', createAccount);

router.get('/accounts/:id', getAccountById);

router.patch('/accounts/:id/status', updateAccountStatus);

router.post('/accounts/:id/deposit', deposit);

router.post('/accounts/:id/withdraw', withdraw);

module.exports = router;
