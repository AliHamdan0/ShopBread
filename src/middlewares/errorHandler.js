const constants = require('./constants');
const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode == 200 || res.statusCode == 201 ? 500 : res.statusCode;
  res.status(statusCode);
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'Validation Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: 'unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: 'Server Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log('ok');
      break;
  }
};

module.exports = errorHandler;
