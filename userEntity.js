const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UsersSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
    max: 40,
  },
      id: {
        type: String,
        required: true,
      },
      userFirstname: {
        type: String,
        required: true,
      },
      userLastname: {
        type: String,
        required: true,
      },
      userPhone: {
        type: String,
        required: true,
      }
});

module.exports = Users = mongoose.model("users", UsersSchema);
