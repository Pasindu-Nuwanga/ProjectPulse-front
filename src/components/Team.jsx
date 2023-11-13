import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Open from "./Open";

function Team({roleName, username}) {
    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/Team.jpg"
       origin = "about-text"
       title = "Meet Our Team"
       />
       <Footer/>
      </>

    );
  }
  
  export default Team;