'use strict';

const Hapi=require('hapi');


// Create a server with a host and port
const server=Hapi.server({
    port:80
});

const io = require('socket.io')(server.listener);

const init = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './www',
                index: 'index.html'
            }
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

io.on('connection', function (socket) {

    let todoJson = '';

    socket.emit('update', todoJson);

    socket.on('edit', function (data) {
        // write to json
        socket.emit('update', todoJson);
    });
});

init();