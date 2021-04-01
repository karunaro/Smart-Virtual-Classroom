const mongoose = require("mongoose");
const User = require('./user').schema
const Course = require('./course').schema
const Group = require('./group').schema
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: { type: String, required: true },
  students: [User],
  courses: [Course],
  groups: [Group]
});
module.exports = Class = mongoose.model("groups", ClassSchema);