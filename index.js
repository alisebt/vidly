require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const error = require("./middlewares/error");
const genres = require("./routers/genres");
const movies = require("./routers/movies");
const users = require("./routers/users");
const auth = require("./routers/auth");
const index = require("./routers/index");
const express = require("express");
const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR!');
    process.exit(1);
}

app.use(express.json())
app.set("view engine", "pug");
app.set("views", "./views");
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', index);
app.use(error);

app.listen("3001", () => console.log('Listenting on 3001'));