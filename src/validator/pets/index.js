const InvariantError = require('../../exceptions/InvariantError');
const { PetPayloadSchema } = require('./schema');

const PetsValidator = {
    validatePetPayload: (payload) => {
        const validationResult = PetPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = PetsValidator;