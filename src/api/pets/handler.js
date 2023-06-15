const ClientError = require('../../exceptions/ClientError');

class PetsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    postPetHandler = async (request, h) => {
        try {
            this._validator.validatePetPayload(request.payload);
            const { name = 'unnamed', species, breed, description, imageUpload } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const [imageUrl, imageName] = await this._service.uploadPetImage(credentialId, imageUpload, "pets")

            const petId = await this._service.addPet({
                name, species, breed, description, owner: credentialId, imageUrl, imageName
            });

            const response = h.response({
                status: 'success',
                message: 'Pet berhasil ditambahkan',
                data: {
                    petId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    getPetsHandler = async (request) => {
        const { id: credentialId } = request.auth.credentials;
        const pets = await this._service.getPets(credentialId);
        return {
            status: 'success',
            data: {
                pets,
            },
        };
    }

    getPetByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;

            await this._service.verifyPetOwner(id, credentialId);
            const pet = await this._service.getPetById(id);

            return {
                status: 'success',
                data: {
                    pet,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    putPetByIdHandler = async (request, h) => {
        try {
            this._validator.validatePetPayload(request.payload);
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;

            await this._service.verifyPetOwner(id, credentialId);
            const { name, species, breed, description, imageUpload } = request.payload;
            const [imageUrl, imageName] = await this._service.uploadPetImage(credentialId, imageUpload, "pets", id);

            const petId = await this._service.editPetById(id, name, species, breed, description, imageUrl, imageName);

            return {
                status: 'success',
                message: 'Pet berhasil diperbarui',
                data: {
                    petId,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    deletePetByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyPetOwner(id, credentialId);
            await this._service.deletePetById(id);

            return {
                status: 'success',
                message: 'Pet berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = PetsHandler;