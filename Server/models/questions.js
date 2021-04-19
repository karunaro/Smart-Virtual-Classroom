const mongoose = require("mongoose");
const User = require('./user').schema
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'users' },
  topic: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String , required: false , default: '' },
  date: { type: Date, required: true, default: Date.now }
});
module.exports = Question = mongoose.model("questions", QuestionsSchema);