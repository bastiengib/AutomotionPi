'use strict';

const Hapi = require('hapi');
const server = Hapi.server({
    port: 21000,
    host: 'localhost'
});
var WebSocket = require('./plugins/pushbullet/pushbullet.controller');
var Computer = require('./plugins/computer/computer.route');
server.route(new Computer());

const init = async () => {

    await server.start();

    var push = new WebSocket(server);

    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();