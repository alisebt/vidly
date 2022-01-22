const express = require("express");
const genres = require("../routers/genres");
const movies = require("../routers/movies");
const users = require("../routers/users");
const auth = require("../routers/auth");
const error = require("../middlewares/error");

module.exports = function (app) {
    app.use(express.json())
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}