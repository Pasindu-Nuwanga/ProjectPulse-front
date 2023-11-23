import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Registration.css"; // Import your CSS file for styling (create this file)

function Registration() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(""); // Role ID will be sent to the server
  const [projectId, setProjectId] = useState(""); // Project ID will be sent to the server

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [projects, setProjects] = useState([]);

  const roles = [
    // { id: 1, name: "Admin" },
    { id: 2, name: "Site Manager" },
    { id: 3, name: "Site Engineer" },
    { id: 4, name: "QA Engineer" },
    { id: 5, name: "Consultant" },
  ];

  useEffect(() => {
    // Fetch projects when the component mounts
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8090/project/all");
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleRegistration = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
      setError("Empty field!");
      return;
    }

    const newInfo = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      roleId: parseInt(roleId), // Parse the role ID as an integer
      projectId: projectId, // Parse the project ID as an integer
    }

    console.log("This is the new info: ", newInfo);;
    try {
      const response = await axios.post("http://localhost:8090/api/v1/employee/save", newInfo);

      if (response.status === 200) {
        setSuccess("Registration was successful!");
        setError("");

        setTimeout(() => {
          setSuccess(null);
          }, 5000);
      }

    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess("");

      setTimeout(() => {
        setError(null);
        }, 5000);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');

  };

  return (
    <div className="registration-container">
      <div className="left-section">
        <img src= "/images/Project_Logo.png" alt="Registration" />
      </div>

      <div className="right-section">
      <div className="card">
        <h2>User Registration</h2>
        <hr />
        <form>
          <div className="form-group">
            <input type="text" 
            className="form-control" 
            placeholder="Enter first name" 
            value={firstname} 
            onChange={(event) => 
            setFirstName(event.target.value)}  
            required />
          </div>

          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter last name" value={lastname} onChange={(event) => setLastName(event.target.value)} required />
          </div>

          <div className="form-group">
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>

          <div className="form-group">
        <select
          className="form-control"
          value={roleId}
          onChange={(event) => setRoleId(event.target.value)}
          required
        >
          <option value="" className="form-option">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id} className="form-option">
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
              <select
                className="form-control"
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                required
              >
                <option value="" className="form-option">
                  Select a project
                </option>
                {projects.map((project) => (
                  <option key={project.projectId} value={project.projectId} className="form-option">
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

          <button type="submit" className="btn btn-primary mt-4" onClick={handleRegistration}>
            Register
          </button>
    
          {error && <div className="reg-error-message">{error}</div>}
          {success && <div className="reg-success-message">{success}</div>}
        </form>
      </div>
    </div>
</div>
  );
}

export default Registration;
