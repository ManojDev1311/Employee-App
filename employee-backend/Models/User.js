const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Apply Auto-Increment Plugin to Employee Schema
UserSchema.plugin(AutoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", UserSchema);