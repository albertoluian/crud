const express = require('express');
const app = express();
const routes = require('./routes.js');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');
require('express-async-errors');
const port = process.env.PORT ? process.env.PORT : process.env.PORTA;
require('./database');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
  app.use((error, req, res, next) => {
    console.log(error.toString());
    res.status(500).send(error.toString());
})