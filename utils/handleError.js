const handleError = (res, statusCode = 500, error, message) => {
  res.status(statusCode).json({
    error: error || 'Error',
    message: message || 'An unexpected error occurred.',
  });
};

module.exports = { handleError };
