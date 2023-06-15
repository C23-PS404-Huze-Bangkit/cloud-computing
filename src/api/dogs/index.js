const DogsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'dogs',
    version: '1.0.0',
    register: async (server, { service }) => {
        const dogsHandler = new DogsHandler(service);
        server.route(routes(dogsHandler));
    },
};