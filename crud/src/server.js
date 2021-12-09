const express = require('express');
const app = express();
const routes = require('./routes.js');
const port = 3000;
require('./database');
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })