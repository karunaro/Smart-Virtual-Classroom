const mongoose = require("mongoose");
const User = require('./user').schema
const Schema = mongoose.Schema;

const ValidationsSchema = new Schema({
  professor: { type: Schema.Types.ObjectId, ref: 'users' },
  topic: { type: String, required: true },
  session: { type: String, required: true },
  asked_work: { type: String , required: true , default: '' },
  deadline: { type: Date, required: false, default: '' }
});
module.exports = Validation = mongoose.model("validations", ValidationsSchema);