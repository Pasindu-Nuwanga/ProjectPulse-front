import { resolvePath } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Open from "./Open";
import PhaseForm from "./PhaseForm";

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
       <PhaseForm/>
      </>

    );
  }
  
  export default Home;