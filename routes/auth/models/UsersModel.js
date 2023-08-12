'use strict'

const mongoose = require("mongoose");

//create mongoose connection
const mongooseConnection = mongoose.createConnection(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
//holds all agent activities
const UserSchema = mongoose.Schema(
    {
        Id:{ type: String, index: true, require,unique:true },
        UserName:{ type: String, index: true, require,unique:true },
        PhoneNumber:{ type: String, index: true, require,unique:true },
        Password: { type: String, index: true,require,default:"Gr1234" },
        Role:{ type: String, index: true,require,default:'Agent' },
        Scope:{ type: [], default:['All'] },
        Location:{ type: String, index: true },
        Team:{ type: String, index: true },
        Enabled:{type:Boolean, default:true,index:true},
        Remarks:{ type: String },
    },
    { timestamps: true, index: true }
)
///intantiate the object
const Users = mongooseConnection.model("Users", UserSchema);

module.exports = {  Users }