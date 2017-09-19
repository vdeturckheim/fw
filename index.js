'use strict';
const Server = require('./lib/server');

const server = new Server();

server.routes.add('get', '/', async function (request, response) {

    response.end('ok');
});

(async () => {

    await server.start(8080);
    console.log('started');

})();
