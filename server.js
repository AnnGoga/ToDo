'use strict';

const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    port:80
});

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

init();