import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Open from "./Open";
import ProjectList from "./ProjectList";
import UserTable from "./UserTable";



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

       <UserTable/>

       <Footer/>
       
      </>

    );
  }
  
  export default Contacts;