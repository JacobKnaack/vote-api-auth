'use strict';

require('dotenv').config();

module.exports = (root) => (req, res, next) => {
  let { user } = req.oidc;
  let isAuthenticated = req.oidc.isAuthenticated();
  if (isAuthenticated) {
    res.render(root + '/profile', {
      user,
      logoutUrl: process.env.BASE_URL + '/logout'
    });
  } else {
    res.redirect(process.env.BASE_URL + '/login');
  }
}
