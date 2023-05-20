const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { defaultNotFaund } = require('./errors/notFaundError');
const error = require('./middlewares/error');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const limiter = require('./utils/ratelimit');
const { dbase } = require('./utils/utils');
const path = require('path');

const { PORT = 3000, DB = dbase } = process.env;

const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect(DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
app.use(requestLogger);
app.use(limiter);

app.use(cors);
app.use(routes);
app.use((req, res, next) => { next(defaultNotFaund); });
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));