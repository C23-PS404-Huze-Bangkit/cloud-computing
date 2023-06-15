const version = require('../../version')

const routes = (handler) => [
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/products`,
        handler: handler.getProductsHandler,
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/products/{id}`,
        handler: handler.getProductByIdHandler,
    },
];

module.exports = routes;