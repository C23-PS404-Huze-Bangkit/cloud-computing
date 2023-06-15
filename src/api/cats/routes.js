const version = require('../version')

const routes = (handler) => [
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/cats`,
        handler: handler.getCatsHandler,
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/cats/{id}`,
        handler: handler.getCatByIdHandler,
    },
];

module.exports = routes;