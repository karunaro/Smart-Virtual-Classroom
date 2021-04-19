const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
  title: { type: String, required: true },
  professor: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  grade: { type: Number, required: true}
});
module.exports = Quizz = mongoose.model("quizzes", QuizzSchema);