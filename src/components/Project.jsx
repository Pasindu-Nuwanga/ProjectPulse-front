import Navbar from "../components/Navbar";
import Open from "./Open";
import CompletedTask from "./CompletedTask";
import "./CompletedTasksStyles.css";
import PhaseForm from "./PhaseForm";
import Footer from "./Footer";


function Project({roleName, username}) {
    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/Project1.jpg"
       origin = "about-text"
       title = "Visit Our Project"
       />

       <PhaseForm/>

       <div className="project-completed">
        <h1>Recently Completed Phases</h1>
        <div className="tasks">
            <CompletedTask
            image= "/images/Task1.jpg"
            heading= "Phase 01"
            body= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem."
            />

            <CompletedTask
            image= "/images/Task2.jpg"
            heading= "Phase 02"
            body= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem."
            />

            <CompletedTask
            image= "/images/Task3.jpg"
            heading= "Phase 03"
            body= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem."
            />
        </div>
       </div>

       <Footer/>
       
      </>

    );
  }
  
  export default Project;