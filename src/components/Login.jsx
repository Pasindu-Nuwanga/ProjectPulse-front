import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({setRole, setRoleName, setUsername, setProjectId, setProjectName}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8090/api/v1/employee/login", {
        email: email,
        password: password,
      });

      if (response.data) {
        // Assuming the backend sends the user object upon successful login
        const userData = response.data

        console.log("This is the user data", userData);
        setRole(userData.roles.roleId)
        setRoleName(userData.roles.roleName)
        setUsername(userData.firstName + " " + userData.lastName)
        setProjectId(userData.projects.projectId)
        setProjectName(userData.projects.projectName)

        setError("");
        navigate("/home");
      } else {
        setError("Incorrect Email and Password!");
      }
    } catch (err) {
      setError("An error occurred while processing your request.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="section-left">
        <img src="/images/Project_Logo.png" alt="Logo" />
      </div>

      <div className="section-right">
        <div className="row">
          <h2>User Login</h2>
          <hr />
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={login}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
