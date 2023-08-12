'use strict'

const { CaptureBiometrics } = require("../../biometrics/services/BiometricsServices");
const { Users } = require("../models/UsersModel");

async function ValidateUser(UserName,Password){

    let result=await Users.find({UserName});
    console.log("result:",result);
    let temp=result[0];
  
    if (temp.Password===Password) {
        delete temp.Password;
        console.log("temp:",temp);
        //login
        let tempx= await CaptureBiometrics("Login",true,UserName,temp.PhoneNumber,"User Login");
        console.log("tempx:",tempx);
        return(tempx);

    } else 
    {
        return({error:"invalide user or password"});
    }

}

module.exports={ValidateUser};

