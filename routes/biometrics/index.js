'use strict'

const { biometricsMaster } = require("./models/BiometricsModel");
const { CaptureBiometrics } = require("./services/BiometricsServices");

module.exports = async function (fastify, opts) {

  fastify.route({
    url: "/registerBreak",
    logLevel: "warn",
    method: ["POST"],
    summary: "Login to Asterisk",
    description: "Login to Asterisk",
    schema: {
      body: {
        type: 'object',
        required: ['EventName', 'Status', 'UserName', 'PhoneNumber', 'Reason'],
        additionalProperties: false,
        properties: {
          EventName: {
            type: 'string',
            description: 'EventName - Example: TEA-BREAK / LUNCH-BREAK, MEETING-BREAK ...'
          },
          Status: {
            type: 'boolean',
            description: 'True - Start of Brek; false - end of break'
          },
          UserName: {
            type: 'string',
            description: 'username'
          },
          PhoneNumber: {
            type: 'string',
            description: 'phone number: e.g. SIP/9999'
          },
          Reason: {
            type: 'string',
            description: 'Reason/Comment for break'
          },

        }

      },
    },

    handler: async (request, reply) => {
      let { EventName, Status, UserName, PhoneNumber, Reason } = request.body;


      try {

        let result = await CaptureBiometrics(EventName, Status, UserName, PhoneNumber, Reason);
        reply.code(200).send({ status: true, data: result })

      }
      catch (error) {
        reply.code(503);
        reply.send({ status: false, data: error });

      }
    }
  });
  fastify.route({
    url: "/userstatus",
    logLevel: "warn",
    method: ["GET"],
    summary: "Get Current Status of an User",
    description: "Get Current Status of an User ",
    schema: {
      querystring: {
        type: 'object',
        required: ['UserName'],
        additionalProperties: false,
        properties: {

          UserName: {
            type: 'string',
            description: 'username'
          },

        }

      },
    },

    handler: async (request, reply) => {
      console.log("request:", request.query);
      let { UserName } = request.query;


      try {

        let result = await biometricsMaster.findOne({ UserName: UserName }).sort({ createdAt: -1 });

        reply.code(200).send({ status: true, data: result })

      }
      catch (error) {
        reply.code(503);
        reply.send({ status: false, data: error });

      }
    }
  });


}
