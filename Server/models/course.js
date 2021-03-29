const mongoose = require("mongoose");
const User = require('./user').schema
const Resources = require('./resources').schema
const Quizz = require('./quizz')
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  professors: [User],
  date: {type: Date, required: true, default: Date.now},
  resources: [Resources],
  quizzes: [Quizz]
});
module.exports = Course = mongoose.model("courses", CourseSchema);