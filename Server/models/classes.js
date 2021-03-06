const mongoose = require("mongoose");

var classesSchema = new mongoose.Schema({
  idProf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  idGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classesGroup",
  },
  name: {
    type: String,
  },
  section: {
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

const classes = mongoose.model("classes", classesSchema, "classes");
module.exports = classes;
