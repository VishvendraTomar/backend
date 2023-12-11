const mongoose = require("mongoose");
const blackListSchema = new mongoose.Schema({
    blackList : {type: [string]},
});

const BlacklistModel = mongoose.model("blacklist",blackListSchema);
module.exports = BlacklistModel;
