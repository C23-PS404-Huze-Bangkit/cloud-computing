const version = require('../version')

const routes = (handler) => [
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/dogs`,
        handler: handler.getDogsHandler,
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/dogs/{id}`,
        handler: handler.getDogByIdHandler,
    },
];

module.exports = routes;