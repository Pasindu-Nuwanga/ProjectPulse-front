import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Open from "./Open";
import ProjectForm from "./ProjectForm";

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

       <Footer/>
       <ProjectForm/>
      </>

    );
  }
  
  export default Contacts;