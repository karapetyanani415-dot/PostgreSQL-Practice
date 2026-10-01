require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');

const customerRoutes = require('./routes/customer.routes');
const accountRoutes = require('./routes/account.routes');
const transferRoutes = require('./routes/transfer.routes');

const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', customerRoutes);
app.use('/api', accountRoutes);
app.use('/api', transferRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync();
    console.log('Tables synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

start();

module.exports = app;