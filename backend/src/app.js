const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING');
});

app.use('/api/auth/user', userRouter);

module.exports = app;
