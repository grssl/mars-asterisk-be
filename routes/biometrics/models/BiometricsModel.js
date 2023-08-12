'use strict'

const mongoose = require("mongoose");

//create mongoose connection
const mongooseConnection = mongoose.createConnection(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
//holds all agent activities
const biometricsMasterSchema = mongoose.Schema(
    {
       
        UserName:{ type: String, index: true, require },
        PhoneNumber:{ type: String, index: true, require },
        EventName: { type: String, index: true,require },
        EventStartDateTime:{ type: Date, index: true },
        EventEndDateTime:{ type: Date, index: true },
        EventDuration:{ type: String, index: true },
        Reason:{ type: String, index: true },
    },
    { timestamps: true, index: true }
)
///intantiate the object
const biometricsMaster = mongooseConnection.model("biometrics", biometricsMasterSchema);

module.exports = {  biometricsMaster }