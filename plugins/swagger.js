'use strict'

const fp = require('fastify-plugin');

//register plugin for swagger documentation
module.exports = fp(async function (fastify, opts) {
    // await fastify.register(require('@fastify/swagger'))

    await fastify.register(require('@fastify/swagger'), {
        swagger: {
            openapi: '3.0.0',
            info: {
                title: 'grcti',
                description: 'asterisk telephony services',
                version: '1.0.0',

            },
            baseUrl: process.env.FASTIFY_ADDRESS + process.env.FASTIFY_PORT,
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header'
                }
            },
            security: [{
                apiKey: ['123456789']
            }],
            host: process.env.FASTIFY_ADDRESS + process.env.FASTIFY_PORT | 'localhost:3000',

            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json']

        },
        hideUntagged: false,  //these 2 stupid variables mask the routes
        exposeRoute: false // without explicit schemas

    }

    );

    fastify.log.info("@fastify/swagger installed...")
    await fastify.register(require('@fastify/swagger-ui'), {

        routePrefix: '/documentation',
        url: process.env.FASTIFY_ADDRESS + process.env.FASTIFY_PORT | 3000,
        uiConfig: {
            docExpansion: 'list',
            deepLinking: true, //false

            displayRequestDuration: true,
            tryItOutEnabled: true,
            supportedSubmitMethods: ["get", "put", "post", "delete", "options", "head", "patch", "trace"],
            validatorUrl: "localhost",
            requestSnippetsEnabled: true,
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true,
        exposeRoute: true
    })
    fastify.log.info("@fastify/swagger-ui installed; documematnaiont at route /documentation")

})