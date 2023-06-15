const CatsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'cats',
    version: '1.0.0',
    register: async (server, { service }) => {
        const catsHandler = new CatsHandler(service);
        server.route(routes(catsHandler));
    },
};