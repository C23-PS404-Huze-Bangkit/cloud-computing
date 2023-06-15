const ClientError = require('../../../exceptions/ClientError');

class ProductsHandler {
    constructor(service) {
        this._service = service;
    }

    getProductsHandler = async () => {
        const products = await this._service.getProducts();
        return {
            status: 'success',
            data: {
                products,
            },
        };
    }

    getProductByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;
            const product = await this._service.getProductById(id);
            return {
                status: 'success',
                data: {
                    product,
                },
            };
        }

        catch (error) {
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

module.exports = ProductsHandler;