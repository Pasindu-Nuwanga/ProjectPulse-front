import Navbar from "../components/Navbar";
import Open from "./Open";
import CompletedTask from "./CompletedTask";
import "./CompletedTasksStyles.css";
import Footer from "./Footer";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

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
       <div className="project-completed">
        <h1>Recently Completed Tasks</h1>
        <div className="tasks">
            <CompletedTask
            image= "/images/Task1.jpg"
            heading= "Task 01"
            body= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem."
            />

            <CompletedTask
            image= "/images/Task2.jpg"
            heading= "Task 02"
            body= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem."
            />

            <CompletedTask
            image= "/images/Task3.jpg"
            heading= "Task 03"
            body= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem."
            />
        </div>
       </div>

       <Footer/>
       <FileUpload/>
      </>

    );
  }
  
  export default Project;