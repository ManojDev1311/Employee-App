import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EmployeeForm = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // Get 'id' from query params
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      // Fetch employee data if editing
      fetch(`http://localhost:5000/api/employees/get-employee/${id}`, {headers: {'Content-Type': 'application/json','Authorization': localStorage.getItem("token")}})
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setPosition(data.position);
          setDepartment(data.department);
        })
        .catch(() => setError("Error fetching employee data"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !position || !department) {
      setError("All fields are required.");
      return;
    }

    try {
      const url = id 
        ? `http://localhost:5000/api/employees/edit-employee/${id}` // Update API
        : "http://localhost:5000/api/employees/add-employee"; // Add API
      
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {'Content-Type': 'application/json','Authorization': localStorage.getItem("token")},
        body: JSON.stringify({ name, position, department }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(id ? "Employee Updated Successfully!" : "Employee Added Successfully!");
        navigate("/employee-report");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{id ? "Edit Employee" : "Add Employee"}</h2>
      <div className="card p-4 shadow">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Position</label>
            <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Department</label>
            <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">{id ? "Update" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;