const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(item) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });
    return schema.validate(item);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
