const config = require("config");
const authm = require("./middlewares/auth");
const genres = require("./routers/genres");
const movies = require("./routers/movies");
const users = require("./routers/users");
const auth = require("./routers/auth");

const index = require("./routers/index");
const express = require("express");
const req = require("express/lib/request");
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR!');
    process.exit(1);
}

app.use(express.json())
//app.use(logger);
app.use(authm);
app.set("view engine", "pug");
app.set("views", "./views");
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', index);

app.listen("3001", () => console.log('Listenting on 3001'));