const Joi = require('joi');

const PetPayloadSchema = Joi.object({
    name: Joi.string().required(),
    species: Joi.string().required(),
    breed: Joi.string(),
    description: Joi.string(),
    imageUpload: Joi.any(),
});

module.exports = { PetPayloadSchema };