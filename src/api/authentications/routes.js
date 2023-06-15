const version = require('../version')

const routes = (handler) => [
    {
        method: 'POST',
        path: `/${version[version.length - 1]}/login`,
        handler: handler.postAuthenticationHandler,
    },
    {
        method: 'PUT',
        path: `/${version[version.length - 1]}/authentications`,
        handler: handler.putAuthenticationHandler,
    },
    {
        method: 'DELETE',
        path: `/${version[version.length - 1]}/authentications`,
        handler: handler.deleteAuthenticationHandler,
    },
];

module.exports = routes;