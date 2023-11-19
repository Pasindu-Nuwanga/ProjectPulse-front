import Home from "./components/Home";
import About from "./components/About";
import Team from "./components/Team";
import Project from "./components/Project";
import Document from "./components/Document";
import Inspection from "./components/Inspection";
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import Registration from "./components/Registration";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import NotAllowed from "./components/NotAllowed";
import Admin from "./components/Admin";

function App() {

  const storedRole = localStorage.getItem('role'); // Retrieve the role from storage
  const storedRoleName = localStorage.getItem("roleName"); 
  const storedUsername = localStorage.getItem('username');
  const storedProjectId = localStorage.getItem('projectId');
  const storedProjectName = localStorage.getItem('projectName');

  const [role, setRole] = useState(storedRole ? parseInt(storedRole, 10) : 0);
  const [roleName, setRoleName] = useState(storedRoleName || "");
  const [username, setUsername] = useState(storedUsername || "");
  const [projectId, setProjectId] = useState(storedProjectId ? parseInt(storedProjectId, 10) : 0);
  const [projectName, setProjectName] = useState(storedProjectName || "");


  useEffect(() => {
    localStorage.setItem("role", role.toString());
    localStorage.setItem("roleName", roleName); // Store the roleName in storage
    localStorage.setItem("username", username);
    localStorage.setItem("projectId", projectId.toString());
    localStorage.setItem("projectName", projectName);
  }, [role, roleName, username, projectId, projectName]);
  
  return (
    <div>
      <BrowserRouter>
         <Routes>
            <Route path="/admin" element={<Admin/>} />
            <Route path="/home" element={role === 2 || role === 3 || role === 4 || role === 5 ? <Home role={role} roleName={roleName} username={username} projectName={projectName}/>:<NotAllowed/>}/>
            <Route path="/about" element={role === 1 || role === 2 || role === 3 || role === 4 || role === 5 ? <About role={role} roleName={roleName} username={username}/>:<NotAllowed/>}/>
            <Route path="/team" element={role === 1 || role === 2 || role === 3 || role === 4 || role === 5 ? <Team role={role} roleName={roleName} username={username}/>:<NotAllowed/>}/>
            <Route path="/project" element={role === 1 || role === 2 || role === 3 || role === 4 || role === 5 ? <Project role={role} roleName={roleName} username={username}/>:<NotAllowed/>}/>
            <Route path="/document" element={role === 1 || role === 2 || role === 3 || role === 4 || role === 5 ? <Document role={role} roleName={roleName} username={username}/>:<NotAllowed/>}/>
            <Route path="/inspection" element={role === 1 || role === 2 || role === 3 || role === 4 || role === 5 ? <Inspection role={role} roleName={roleName} username={username}/>:<NotAllowed/>}/>
            <Route path="/contact" element={role === 1 || role === 2 || role === 3 || role === 4 || role === 5 ? <Contacts role={role} roleName={roleName} username={username}/>:<NotAllowed/>}/>
            <Route path="/login" element={<Login setRole={setRole} setRoleName={setRoleName} setUsername={setUsername} 
                                                 setProjectId={setProjectId} setProjectName={setProjectName}/>}/>

         </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
