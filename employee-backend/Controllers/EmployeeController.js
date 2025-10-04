const Employee = require("../models/Employee");

const addEmployee = async (req, res) => {
  try {
    const { name, department, position } = req.body;
    const newEmployee = await Employee.create({ name, department, position });
    // await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.log({error});
    res.status(500).json({ message: "Server error", error });
  }
}

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, position } = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId : id }, // Find by custom field instead of `_id`
      { name, department, position },
      { new: true } // Returns the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findOneAndDelete({ employeeId: id }); // Use employeeId instead of _id

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

const searchByEmployeeID = async (req, res) => {
  try {
    const { id } = req.params; // Extract the 'id' from the URL parameter
    const employee = await Employee.findOne({ employeeId : id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee); // Send the specific employee data
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
   addEmployee, editEmployee, deleteEmployee, searchByEmployeeID, getAllEmployees
}