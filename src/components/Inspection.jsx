import Navbar from "../components/Navbar";
import Footer from "./Footer";
import InspectionRequestForm from "./InspectionRequestForm";
import InspectionRequestTable from "./InspectionRequestTable";
import Open from "./Open";
import { useState } from "react";
import "./Inspection.css";
import InspectionResultForm from "./InspectionResultForm";
import InspectionResultTable from "./InspectionResultTable";

function Inspection({role, roleName, username}) {

  const [activeComponent, setActiveComponent] = useState('');
  
    const handleNavigation = (component) => {
      setActiveComponent(component);
    };

    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/Inspection.jpg"
       origin = "about-text"
       title = "Inspections"
       />

      <div>
        <div className="inspection-container">
          <div className="inspection-buttons">
          {role === 3 && (<button
              className={`inspection-button ${activeComponent === 'inspectionRequestForm' ? 'active' : ''}`}
              onClick={() => handleNavigation('inspectionRequestForm')}
            >
              Request Form
            </button>)}
            <button
              className={`inspection-button ${activeComponent === 'inspectionRequestTable' ? 'active' : ''}`}
              onClick={() => handleNavigation('inspectionRequestTable')}
            >
              Request Table
            </button>
            
            {/* Result form access only for consultant */}
            {role === 5 && (
              <button
                className={`inspection-button ${activeComponent === 'inspectionResultForm' ? 'active' : ''}`}
                onClick={() => handleNavigation('inspectionResultForm')}
              >
                Result Form
              </button>
            )}

            <button
              className={`inspection-button ${activeComponent === 'inspectionResultTable' ? 'active' : ''}`}
              onClick={() => handleNavigation('inspectionResultTable')}
            >
              Result Table
            </button>
          </div>
  
          {role === 3 && activeComponent === 'inspectionRequestForm' && <InspectionRequestForm />}
          {activeComponent === 'inspectionRequestTable' && <InspectionRequestTable role = {role}/>}
          {role === 5 && activeComponent === 'inspectionResultForm' && <InspectionResultForm/>}
          {activeComponent === 'inspectionResultTable' && <InspectionResultTable/>}
        </div>
      </div>


       <Footer/>
       
      </>

    );
  }
  
  export default Inspection;

  
    

      
  
  