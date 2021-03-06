'use strict';

var redirect = require('./redirect');

var forceDomain = function (options) {
  return function (req, res, next) {
    var newRoute = redirect(req.protocol, req.headers.host, req.url, options),
        statusCode;

    if (!newRoute) {
      return next();
    }

    statusCode = (newRoute.type === 'permanent') ? 301 : 307;

    res.writeHead(statusCode, {
      Location: newRoute.url
    });
    res.end();
  };
};

module.exports = forceDomain;
