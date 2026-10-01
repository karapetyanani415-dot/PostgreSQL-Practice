const express = require('express');

const { createTransfer } = require('../controllers/transfer.controller');

const router = express.Router();

router.post('/transfers', createTransfer);

module.exports = router;