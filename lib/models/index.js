'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const user = require('./user');

const CONNECTION_STRING = (
  process.env.DATABASE_URL &&
  process.env.NODE_ENV !== 'test'
) ? process.env.DATABASE_URL : 'sqlite::memory:';

const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
  tables: { user: user(sequelize, DataTypes), },
  sequelize,
}
