const Joi = require('joi');
 
const UserPayloadSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
  imageUpload: Joi.any(),
});
 
module.exports = { UserPayloadSchema };