const express = require('express');
const app = express();
const routes = require('./routes.js');
require('dotenv/config');
const port = process.env.PORTA;
require('./database');
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })