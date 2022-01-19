const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const config = require('config');
const _ = require('lodash');
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
mongoose.connect('mongodb://localhost/vidly');

router.get('/', async (req, res) => {
    throw new Error('error happened');
    const result = await User.find().sort({ name: 1 });
    res.send(result);
});

router.get('/me', auth, async (req, res) => {
    const result = await User.findById(req.user._id).select("-password");
    res.send(result);
});

router.get('/:id', async (req, res) => {
    let result = await User.find({ _id: req.params.id });
    if (!result)
        return res.status(404).send("Not found");

    return res.send(result);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    const response = _.pick(user, ['_id', 'name', 'email']);
    return res.header('x-auth-token', token).send(response);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name
        },
        {
            new: true
        }
    );
    if (!user)
        return res.status(404).send("Not found");

    return res.send(user);
})

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(
        req.params.id
    );
    if (!user)
        return res.status(404).send("Not found");

    return res.send(user);
})

module.exports = router;