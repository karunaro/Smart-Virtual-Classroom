const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InvitationClassSchema = new Schema({
  status: {
    type: String,
  },
  classOb: {
    type: Schema.Types.ObjectId,
    ref: "classes",
  },
  userOb: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("InvitationClass", InvitationClassSchema);
