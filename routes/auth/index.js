'use strict'

const { CaptureBiometrics } = require("../biometrics/services/BiometricsServices");
const { Users } = require("./models/UsersModel");
const { ValidateUser } = require("./services/AuthServices");

//these 2 default role will be created first time
let admin = {
    Id: "1",
    UserName: "admin",
    PhoneNumber: "SIP/8888",
    Password: "password",
    Role: "SuperAdmin",
    Scope: ['All'],
    Location: "DD4",
    Team: "IT",
    Enabled: true,
    Remarks: "This is an admin account"
};
let agent = {
    Id: "2",
    UserName: "SIP/9999",
    PhoneNumber: "SIP/9999",
    Password: "Gr1234",
    Role: "Agent",
    Scope: ["Inbound", "Outbound", "Autodailer", "Manualdailer", "Fetchdialer"],
    Location: "DD4",
    Team: "IT",
    Enabled: true,
    Remarks: "This a test agent account"
};

module.exports = async function (fastify, opts) {

    //create an Agent and Admin account if it is the first instance
    let temp = await Users.find({}).countDocuments();

    if (temp <= 0) {
        try {
            await Users.create(admin);
            await Users.create(agent);

        } catch (error) {
            console.log(new Date(), error);
        }
    };

    fastify.get('/', async function (request, reply) {
        return 'this the auth route'
    });
    fastify.route({
        url: "/login",
        logLevel: "warn",
        method: ["POST"],
        summary: "Login to Asterisk",
        description: "Login to Asterisk",
        schema: {
            body: {
                type: 'object',
                required: ['UserName', 'Password'],
                additionalProperties: false,
                properties: {
                    UserName: {
                        type: 'string',
                        description: 'username'
                    },
                    Password: {
                        type: 'string',
                        description: " Password"
                    },

                }

            },
        },

        handler: async (request, reply) => {
            let { UserName, Password } = request.body;


            try {

                let result = await ValidateUser(UserName, Password);
                reply.code(200).send({ status: true, data: result })

            }
            catch (error) {
                reply.code(503);
                reply.send({ status: false, data: error });

            }
        }
    });

    fastify.route({
        url: "/logout",
        logLevel: "warn",
        method: ["POST"],
        summary: "Login to Asterisk",
        description: "Login to Asterisk",
        schema: {
            body: {
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
            let { UserName} = request.body;


            try {

                let result =await CaptureBiometrics("Login",false,UserName,temp.PhoneNumber,"User Logout");
                reply.code(200).send({ status: true, data: result })

            }
            catch (error) {
                reply.code(503);
                reply.send({ status: false, data: error });

            }
        }
    });

}
