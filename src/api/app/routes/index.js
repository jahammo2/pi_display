'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const digits = require('./digits');

const apiRouter = express.Router(); // eslint-disable-line new-cap

apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

// /api/{route}
digits(apiRouter);

module.exports = apiRouter;
