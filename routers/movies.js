const { Movie, validate } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
mongoose.connect('mongodb://localhost/vidly');

router.get('/', async (req, res) => {
    const result = await Movie.find().sort({ name: 1 });
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

    let movie = new Movie({
        name: req.body.name,
        numberInStock: req.body.numberInStock,
        dailyRetalRate: req.body.dailyRetalRate,
        genre:
    });
    let result = await genre.save();
    return res.send(result);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name
        },
        {
            new: true
        }
    );
    if (!genre)
        return res.status(404).send("Not found");

    return res.send(genre);
})

router.delete('/:id', async (req, res) => {
    const genre = await Movie.findByIdAndDelete(
        req.params.id
    );
    if (!genre)
        return res.status(404).send("Not found");

    return res.send(genre);
})

module.exports = router;