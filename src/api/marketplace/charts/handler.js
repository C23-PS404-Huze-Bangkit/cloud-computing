const ClientError = require('../../../exceptions/ClientError');

class ChartsHandler {
    constructor(service) {
        this._service = service;
    }

    postChartHandler = async (request, h) => {
        try {
            const { fkProduct, quantity } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const chartId = await this._service.addChart(fkProduct, quantity, credentialId);

            const response = h.response({
                status: 'success',
                message: 'Chart berhasil ditambahkan',
                data: {
                    chartId,
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

    getChartsHandler = async (request) => {
        const { id: credentialId } = request.auth.credentials;
        const charts = await this._service.getCharts(credentialId);
        return {
            status: 'success',
            data: {
                charts,
            },
        };
    }

    getChartByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;

            await this._service.verifyChartOwner(id, credentialId);
            const chart = await this._service.getChartById(id);

            return {
                status: 'success',
                data: {
                    chart,
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

    deleteChartByIdHandler = async (request, h) => {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyChartOwner(id, credentialId);
            await this._service.deleteChartById(id);

            return {
                status: 'success',
                message: 'Chart berhasil dihapus',
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

module.exports = ChartsHandler;