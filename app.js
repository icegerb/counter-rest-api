const express = require('express');
const app = express();
const port = 3000;

const counterApiRouter = require('./routes/counter-api');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());

app.use('/counter-api', authMiddleware, counterApiRouter);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource could not be found.',
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const response = {
    error: err.name || 'Error',
    message: err.message || 'An unexpected error occurred.',
  };

  if (req.app.get('env') === 'development') {
    response.stack = err.stack;
  }
  res.status(statusCode).json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
