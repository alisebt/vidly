const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
mongoose.connect('mongodb://localhost/vidly');

router.get('/', async (req, res) => {
    const result = await Customer.find().sort({ name: 1 });
    res.send(result);
});

router.get('/:id', async (req, res) => {
    let result = await Customer.find({ _id: req.params.id });
    if (!result)
        return res.status(404).send("Not found");

    return res.send(result);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name
    });
    let result = await customer.save();
    return res.send(result);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name
        },
        {
            new: true
        }
    );
    if (!customer)
        return res.status(404).send("Not found");

    return res.send(customer);
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(
        req.params.id
    );
    if (!customer)
        return res.status(404).send("Not found");

    return res.send(customer);
})

module.exports = router;