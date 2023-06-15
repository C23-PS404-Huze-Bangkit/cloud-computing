const version = require('../../version')

const routes = (handler) => [
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/articles`,
        handler: handler.getArticlesHandler,
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/articles/{id}`,
        handler: handler.getArticleByIdHandler,
    },
];

module.exports = routes;