const mongoose = require("mongoose");

var sectionschema = new mongoose.Schema({
  idProf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  idGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classesGroup",
  },
  idClasses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
  },
  name: {
    type: String,
  },
  dateCreation: {
    type: Date,
    min: "1987-09-28",
  },
  classUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const sections = mongoose.model("sections", sectionschema, "sections");
module.exports = sections;
