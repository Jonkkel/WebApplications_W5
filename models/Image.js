const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let imageSchema = new Schema({
    buffer : Buffer,
    mimetype : String,
    encoding : String,
    name: String
});


module.exports = mongoose.model("Image", imageSchema);