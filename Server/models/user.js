const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  resetPasswordToken: {type : String,default:null},
  etat: {type : Boolean,default:true},
  role: { type: String, default: 'student', enum: ["student", "professor", "admin"],
  },
  image: {
    type: String,
    default:"http://localhost:444/uploads/1618892167093-clipartkey_1520367.png"
  } 
});
module.exports = User = mongoose.model("users", UserSchema);