/* Libs */
const express = require('express');

/* Data */
const port = process.env.PORT || 2684;
const server = express();
const api = require('./Api.js');
const router = require('./Routes.js');

/* Code */
server.use(router);
server.listen(port);
console.log(`A API esta ligada na porta ${port}.`);