const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true },
    ast: { type: Object, required: true },
});

module.exports = mongoose.model("Rule", ruleSchema);
