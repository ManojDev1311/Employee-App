import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { FaUserTie } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeReport from "./pages/EmployeeReport";
import Nopage from './pages/Nopage';
import RefreshHandler from './RefreshHandler';

function App() {
  const [isAuthanticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element}) => {
      return isAuthanticated ? element : <Navigate to="/" />;
  }
  return (
    <Router>
      <div className="app-container">
        <FaUserTie size={40} className="text-white me-2" />
        <div className="container mt-4">
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/employee-form" element={<PrivateRoute element={<EmployeeForm />}/>} />
            <Route path="/employee-report" element={<PrivateRoute element={<EmployeeReport />}/>} />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
