'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });
  await server.register({
    plugin: require('blipp')
  });
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return 'Hello World!';
      },
      options: {
        description: 'base route'
      }
    },
    {
      method: 'GET',
      path: '/name/{name}',
      handler: (request, h) => {
        return `Hello ${request.params.name}`;
      },
      options: {
        description: 'return Hello + the name param'
      }
    }
  ]);
  await server.start();
  console.clear();
  // console.log(server.plugins.blipp.info());
  console.log(server.plugins.blipp.text());
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
