import Navbar from "../components/Navbar";
import FileList from "./FileList";
import FileUpload from "./FileUpload";
import Footer from "./Footer";
import Open from "./Open";
import "./Document.css";
import { useState } from "react";

function Document({role, roleName, username}) {

    const [activeComponent, setActiveComponent] = useState('');
    
      const handleNavigation = (component) => {
        setActiveComponent(component);
      };

    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/Document.jpg"
       origin = "about-text"
       title = "Project Documents"
       />

      <div>
        <div className="document-container">
          <div className="document-buttons">
            {role === 4 && (<button
              className={`document-button ${activeComponent === 'fileUpload' ? 'active' : ''}`}
              onClick={() => handleNavigation('fileUpload')}
            >
              File Upload
            </button>)}
            <button
              className={`document-button ${activeComponent === 'fileList' ? 'active' : ''}`}
              onClick={() => handleNavigation('fileList')}
            >
              File Access
            </button>
          </div>
  
          {role === 4 && activeComponent === 'fileUpload' && <FileUpload />}
          {activeComponent === 'fileList' && <FileList role={role} />}
        </div>
      </div>

       <Footer/>
      </>

    );
  }
  
  export default Document;