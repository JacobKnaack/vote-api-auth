'use strict';

require('dotenv').config();
const app = require('./lib/app');
const { sequelize } = require('./lib/models');
const PORT = process.env.PORT || 3002

sequelize.sync()
  .then(() => app.start(PORT))
  .catch(console.error);
