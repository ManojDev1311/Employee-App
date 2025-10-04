const express = require("express");
const { ensureAuthenticated } = require("../Middlewares/Auth");
const { addEmployee, editEmployee, deleteEmployee, searchByEmployeeID, getAllEmployees } = require("../Controllers/EmployeeController");
const { addEmpValidation } = require("../Middlewares/EmployeeValidation");

const router = express.Router();

// Add Employee
router.post("/add-employee", addEmpValidation , ensureAuthenticated , addEmployee);

// Edit Employee
router.put("/edit-employee/:id", ensureAuthenticated , editEmployee);


// Delete Employee
router.delete("/delete-employee/:id", ensureAuthenticated , deleteEmployee);


router.get("/get-employee/:id", ensureAuthenticated , searchByEmployeeID);

// Get All Employees
router.get("/", ensureAuthenticated , getAllEmployees);

module.exports = router;