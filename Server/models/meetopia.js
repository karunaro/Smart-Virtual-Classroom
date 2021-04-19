const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetopiaSchema = new Schema({
  title: { type: String, required: true },
  attendance: [{ type: Schema.Types.ObjectId, required: true, ref: 'users' }],
  startDate: { type: Date, required: true, default: Date.now },
  professor: { type: Schema.Types.ObjectId, required: true, ref: 'users' }
});
module.exports = Meetopia = mongoose.model("meetopias", MeetopiaSchema);