const express = require('express');
const app = express();
const routes = require('./routes.js');
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })