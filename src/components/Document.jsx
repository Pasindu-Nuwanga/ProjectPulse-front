import Navbar from "../components/Navbar";
import FileList from "./FileList";
import Footer from "./Footer";
import Open from "./Open";

function Document({roleName, username}) {
    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/Document.jpg"
       origin = "about-text"
       title = "Project Documents"
       />

       <FileList/>

       <Footer/>
      </>

    );
  }
  
  export default Document;