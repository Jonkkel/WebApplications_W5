const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryScheme = new Schema({
    name: String
});



module.exports = mongoose.model("Category", categoryScheme);