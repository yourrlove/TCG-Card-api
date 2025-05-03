require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');


// Routers
const indexRouter = require('./routes/index');
// Middlewares
// const corsOptions = require('./configs/CORS/corsOptions');
// const credentials = require('./middlewares/credentials');

const app = express();
 
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);


// Cross Origin Resource Sharing
// app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

//init mysql db
const { sequelize } = require('./models/index');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



app.use('/v1', indexRouter);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.json({
    "msg": "Hello World",
  });
});

// handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
});

module.exports = app;