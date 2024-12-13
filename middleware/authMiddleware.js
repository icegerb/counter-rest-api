const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      error: 'Error',
      message: 'An unexpected error occurred.',
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token is missing from the authorization header',
    });
  }

  next();
};

module.exports = authMiddleware;
