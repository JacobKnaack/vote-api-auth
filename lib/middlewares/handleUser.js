'use strict';

// const jwt = require('jsonwebtoken');

// Fetches a user profile, creates a new one if one does not exist
module.exports = (userTable) => async (req, res, next) => {
  // check if openID is authenticated
  try{
    let { user } = req.oidc;
    let record = null;

    if (user && user.name && user.sub) {
      record = await userTable.findOne({ where: { user_id: user.sub }});
      if (record === null) {
        record = await userTable.create({ name: user.name, user_id: user.sub });
      }
      req.records = {user: record};
    }
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
}
