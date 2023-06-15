const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    postUserHandler = async (request, h) => {
        try {
            this._validator.validateUserPayload(request.payload);
            const { email, password, fullname } = request.payload;
            const userId = await this._service.addUser({ email, password, fullname });

            const response = h.response({
                status: 'success',
                message: 'User berhasil ditambahkan',
                data: {
                    userId,
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

    putUserHandler = async (request, h) => {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { fullname, imageUpload } = request.payload;
            const image = await this._service.uploadUserImage(credentialId, imageUpload);

            const userId = await this._service.editUser(fullname, image, credentialId);

            return {
                status: 'success',
                message: 'User berhasil diperbarui',
                data: {
                    userId,
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

            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    getUserByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;

            const user = await this._service.getUserById(id);

            return {
                status: 'success',
                data: {
                    user,
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

            // server ERROR!
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

module.exports = UsersHandler;