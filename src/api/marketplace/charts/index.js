const ChartsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'charts',
    version: '1.0.0',
    register: async (server, { service }) => {
        const chartsHandler = new ChartsHandler(service);
        server.route(routes(chartsHandler));
    },
};