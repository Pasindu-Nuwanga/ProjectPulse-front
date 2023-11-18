import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Open from "./Open";

function Home({roleName, username, projectName}) {
    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "home"
       openImg = "/images/Homepage.jpg"
       origin = "home-text"
       title = "WELCOME"
       text = "TO"
       project = {projectName}
       />

       <Footer/>
       
      </>

    );
  }
  
  export default Home;