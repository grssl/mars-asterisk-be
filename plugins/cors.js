'use strict'

const fp = require('fastify-plugin');

const cors = require('@fastify/cors');

module.exports = fp(async function (fastify, opts) {
  // await fastify.register(cors, { 
  //     // put your options here
  //     origin:'*',
  //     allowedHeaders:['Content-Type', 'Authorization','api_key'],
  //     exposedHeaders:['Content-Range', 'X-Content-Range','api_key'],

  //   })

  //   fastify.log.info("cors plugin loaded..")


  fastify.register(require('@fastify/cors'), (instance) => {
    return (req, callback) => {
      const corsOptions = {
        origin: true
      }
      callback(null, corsOptions)
    }
  })
})