const ClientError = require('../../../exceptions/ClientError');

class ArticlesHandler {
    constructor(service) {
        this._service = service;
    }

    getArticlesHandler = async () => {
        const articles = await this._service.getArticles();
        return {
            status: 'success',
            data: {
                articles,
            },
        };
    }

    getArticleByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;
            const article = await this._service.getArticleById(id);
            return {
                status: 'success',
                data: {
                    article,
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

module.exports = ArticlesHandler;