const ClientError = require('../../exceptions/ClientError');

class CatsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    getCatsHandler = async () => {
        const [catsArr, characteristics] = await this._service.getCats();
        const catShow = catsArr.map(cat => {
            return {
                ...cat,
                characteristics: {
                    ...Object.values(characteristics).find(char => cat.id === char.id)
                }
            }
        })
        return {
            status: 'success',
            data: {
                cats: [
                    ...catShow,
                ],
            },
        };
    }

    getCatByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;

            const [catArr, characteristics] = await this._service.getCatById(id);
            const catShow = catArr.map(cat => {
                return {
                    ...cat,
                    characteristics: {
                        ...Object.values(characteristics).find(char => cat.id === char.id)
                    }
                }
            })
            return {
                status: 'success',
                data: {
                    cat: [
                        ...catShow
                    ]
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

module.exports = CatsHandler;