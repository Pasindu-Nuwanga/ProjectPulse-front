import Navbar from "../components/Navbar";
import Footer from "./Footer";
import InspectionResultForm from "./InspectionResultForm";
import InspectionResultTable from "./InspectionResultTable";
import Open from "./Open";


function Contacts({roleName, username}) {
    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/Contacts.jpg"
       origin = "about-text"
       title = "Contact Us"
       />

       <InspectionResultTable/>

       <Footer/>
       
      </>

    );
  }
  
  export default Contacts;