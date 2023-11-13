import Navbar from "../components/Navbar";
import Footer from "./Footer";
import InspectionRequestForm from "./InspectionRequestForm";
import InspectionRequestTable from "./InspectionRequestTable";
import Open from "./Open";

function Inspection({roleName, username}) {
    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/Inspection.jpg"
       origin = "about-text"
       title = "Inspections"
       />

       <InspectionRequestForm/>

       <Footer/>

       <InspectionRequestTable/>
       
      </>

    );
  }
  
  export default Inspection;