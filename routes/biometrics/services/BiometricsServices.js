'use strict'
const dayjs = require('dayjs');
const { biometricsMaster } = require('../models/BiometricsModel');
async function CaptureBiometrics(EventName, Status, UserName, PhoneNumber = '', Reason) {

    EventName.toUpperCase();
    PhoneNumber.toUpperCase();
    //let timeNow=new dayjs(Date()).format("YYYY-MM-DD hh:mm:ss");
    let timeNow = new Date();
    let start = "";
    let end = "";
    let duration = '';
    let temp = null;
    if (Status) {
        start = timeNow;

    } else {
        end = timeNow;
        //get the old record;
        temp = await biometricsMaster.findOne({ UserName: UserName }).sort({ createdAt: -1 });
        console.log("temp inside bio:", temp);
        duration = (timeNow - temp.EventStartDateTime)/1000;
        console.log("duraiton:", duration);
        PhoneNumber = temp.PhoneNumber;
        start = temp.EventStartDateTime;

    }

    let Record = {
        UserName,
        PhoneNumber,
        EventName,
        EventStartDateTime: start,
        EventEndDateTime: end,
        EventDuration: duration,
        Reason: Reason
    }

    console.log("update record:", Record);
    let result = undefined;
    if (Status) {   //create record
        result = await biometricsMaster.create(Record);
    } else {
        result = await biometricsMaster.findByIdAndUpdate(temp._id, Record, { new: true });
    }
    console.log("biometric create result:", result);
    return (result);
}

module.exports = { CaptureBiometrics }