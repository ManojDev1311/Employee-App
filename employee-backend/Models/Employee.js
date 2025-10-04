const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true, unique: true },
});

// Apply Auto-Increment Plugin to Employee Schema
EmployeeSchema.plugin(AutoIncrement, { inc_field: "employeeId" });

module.exports = mongoose.model("Employee", EmployeeSchema);