import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const EmployeeReport = () => {

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");

  // Fetch employees from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/employees/", {headers: {'Content-Type': 'application/json','Authorization': localStorage.getItem("token")}}) // API call to backend
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  
  // Delete Employee
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:5000/api/employees/delete-employee/${id}`, { method: "DELETE" , headers: {'Content-Type': 'application/json','Authorization': localStorage.getItem("token")}})
        .then((response) => response.json())
        .then((data) => {
          console.log("Employee deleted:", data);
          setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        })
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  // Filter employees based on search term and department
  var filteredEmployees = '';
  if(employees.length){
    var filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (department === "All" || emp.department === department)
  );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Employee Report</h2>

      {/* Search Bar & Filter */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, index) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">
                  <a href={`http://localhost:3000/employee-form?id=${emp.employeeId}`} target="_blank" rel="noopener noreferrer">
                    Edit
                  </a>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.employeeId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeReport;