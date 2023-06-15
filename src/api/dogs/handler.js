const { object } = require('joi');
const ClientError = require('../../exceptions/ClientError');

class DogsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    getDogsHandler = async () => {
        const [dogsArr, characteristics] = await this._service.getDogs();
        const dogShow = dogsArr.map(dog => {
            return {
                ...dog,
                characteristics: {
                    ...Object.values(characteristics).find(char => dog.id === char.id)
                }
            }
        })
        return {
            status: 'success',
            data: {
                dogs: [
                    ...dogShow,
                ],
            },
        };
    }

    getDogByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;

            const [dogArr, characteristics] = await this._service.getDogById(id);
            const dogShow = dogArr.map(dog => {
                return {
                    ...dog,
                    characteristics: {
                        ...Object.values(characteristics).find(char => dog.id === char.id)
                    }
                }
            })
            return {
                status: 'success',
                data: {
                    dog: [
                        ...dogShow
                    ]
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response ({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response ({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = DogsHandler;