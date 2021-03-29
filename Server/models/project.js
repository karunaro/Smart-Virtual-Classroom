const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  tasks: { type: Array, required: true }
});
module.exports = Project = mongoose.model("projects", ProjectSchema);