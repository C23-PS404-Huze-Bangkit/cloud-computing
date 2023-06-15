const version = require('../version')

const routes = (handler) => [
    {
        method: 'POST',
        path: `/${version[version.length - 1]}/pets`,
        handler: handler.postPetHandler,
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
        path: `/${version[version.length - 1]}/pets`,
        handler: handler.getPetsHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
    {
        method: 'GET',
        path: `/${version[version.length - 1]}/pets/{id}`,
        handler: handler.getPetByIdHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
    {
        method: 'PUT',
        path: `/${version[version.length - 1]}/pets/{id}`,
        handler: handler.putPetByIdHandler,
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
        method: 'DELETE',
        path: `/${version[version.length - 1]}/pets/{id}`,
        handler: handler.deletePetByIdHandler,
        options: {
            auth: 'huze_jwt',
        },
    },
];

module.exports = routes;