const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
  title: { type: String, required: true },
  professor: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  students: [ { type: Schema.Types.ObjectId, required: true, ref: 'users' } ],
  answers: [ { student: { type: Schema.Types.ObjectId, required: true, ref: 'users' }, answers: [] } ], 
  grades: [ { student: { type: Schema.Types.ObjectId, required: true, ref: 'users' }, grade: { type: Number, default: -1 } } ],
  course: { type: Schema.Types.ObjectId, ref: 'courses' },
  questions: [{ question: { type: String }, firstAnswer: { type: String }, secondAnswer: { type: String }
    ,thirdAnswer: { type: String }, correctAnswer: { type: Number } }]
});
module.exports = Quizz = mongoose.model("quizzes", QuizzSchema);