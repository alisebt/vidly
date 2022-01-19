const { Movie, validate } = require("../models/movie");
const { Genre } = require('../models/genre');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
mongoose.connect('mongodb://localhost/vidly');

router.get('/', async (req, res) => {
    const result = await Movie.find().sort({ title: 1 });
    res.send(result);
});

router.get('/:id', async (req, res) => {
    let result = await Movie.find({ _id: req.params.id });
    if (!result)
        return res.status(404).send("Not found");

    return res.send(result);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send('Invalid genre!');

    let movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalPrice: req.body.dailyRentalPrice,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    let result = await movie.save();
    return res.send(result);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send('Invalid genre!');

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalPrice: req.body.dailyRentalPrice,
            genre: {
                _id: genre._id,
                name: genre.name
            }
        },
        {
            new: true
        }
    );
    if (!movie)
        return res.status(404).send("Not found");

    return res.send(movie);
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(
        req.params.id
    );
    if (!movie)
        return res.status(404).send("Not found");

    return res.send(movie);
})

module.exports = router;