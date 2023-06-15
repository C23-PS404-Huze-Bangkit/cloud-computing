const version = require('../version')

const routes = (handler) => [
    {
        method: 'POST',
        path: `/${version[version.length - 1]}/register`,
        handler: handler.postUserHandler,
    },
    {
        method: 'PUT',
        path: `/${version[version.length - 1]}/users/edit`,
        handler: handler.putUserHandler,
        options: {
            auth: 'huze_jwt',
            payload: {
                output: 'stream',
                parse: true,
                multipart: true,
                maxBytes: 10 * 1024 * 1024, // Batas ukuran file (misalnya 10MB)
            },
        },
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/users/{id}`,
        handler: handler.getUserByIdHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
];

module.exports = routes;