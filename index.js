'use strict';

require('dotenv').config();
const app = require('./lib/app');
const PORT = process.env.PORT || 3002

app.start(PORT);