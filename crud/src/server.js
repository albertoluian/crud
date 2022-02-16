const express = require('express');
const app = express();
const routes = require('./routes.js');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');
const port = process.env.PORTA;
require('./database');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })