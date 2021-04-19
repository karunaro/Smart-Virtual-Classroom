const mongoose = require("mongoose");
const User = require('./user').schema
const Question = require('./questions').schema
const Project = require('./project').schema
const Validation = require('./validations').schema
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  questions: [{ type: Schema.Types.ObjectId, ref: 'questions' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'projects' }],
  validations: [{ type: Schema.Types.ObjectId, ref: 'validations' }]
});
module.exports = Group = mongoose.model("groups", GroupSchema);