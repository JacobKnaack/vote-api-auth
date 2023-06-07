'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const { tables } = require('./models');
const {
  handleProfile,
  handleError,
  handleUser
} = require('./middlewares');

const app = express();
const root = path.join(__dirname, '../public');

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_URL
};

app.set('view engine', 'ejs');
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(express.static(root));
app.use(handleUser(tables.user));

app.get('/', handleProfile(root));
app.use(handleError(root));

module.exports = {
  app,
  start: (PORT) => app.listen(PORT, () => {
    console.log('Auth Client running on PORT: ' + PORT);
  }),
}