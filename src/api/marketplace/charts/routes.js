const version = require('../../version')

const routes = (handler) => [
    {
        method: 'POST',
        path: `/${version[version.length - 1]}/charts`,
        handler: handler.postChartHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/charts`,
        handler: handler.getChartsHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/charts/{id}`,
        handler: handler.getChartByIdHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
    {
        method: 'DELETE',
        path: `/${version[version.length - 1]}/charts/{id}`,
        handler: handler.deleteChartByIdHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
];

module.exports = routes;