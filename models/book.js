const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: { type: String, required: true },
  ISBN: { type: String, required: true, maxLength: 13, minLength: 13 },
});

//Export model
module.exports = mongoose.model("Book", BookSchema);
