'use strict';

// should respond with error view
module.exports = (root) => (error, req, res, next) => {
  res.render(root + '/error', {
    error,
  });
}
