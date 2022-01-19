const logger = require("./middlewares/logger");
const auther = require("./middlewares/auther");
const genres = require("./routers/genres");
const movies = require("./routers/movies");
const index = require("./routers/index");
const express = require("express");
const req = require("express/lib/request");
const app = express();
app.use(express.json())
app.use(logger);
app.use(auther);
app.set("view engine", "pug");
app.set("views", "./views");
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/', index);

app.listen("3001", () => console.log('Listenting on 3001'));