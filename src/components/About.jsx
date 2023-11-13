import Navbar from "../components/Navbar";
import Open from "./Open";
import "./About.css";
import Footer from "./Footer";

function About({roleName, username}) {
    return (
      <>
       <Navbar roleName={roleName} username={username}/>
       <Open
       clsName = "about"
       openImg = "/images/About.jpg"
       origin = "about-text"
       title = "About Us"
       />
       <div className="about-description">
        <h4>Welcome to Project Pulse</h4>
        <h1>25 Years Expierience</h1>
        </div>

        <div className="descr-body"> 
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. 
          Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem.<p/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. 
          Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem. 
          Curabitur non nisl nec nisi scelerisque maximus. Aenean consectetur convallis porttitor. 
          Aliquam interdum at lacus non blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. 
          Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem. 
          Curabitur non nisl nec nisi scelerisque maximus. Aenean consectetur convallis porttitor. 
          Aliquam interdum at lacus non blandit.</p>
          
          <div className="image">
          <img alt="img2" src="/images/About_2.jpg"/>
          </div>
          </div>

          <Footer/>

       
      </>

    );
  }
  
  export default About;