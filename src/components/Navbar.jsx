
import { Component } from "react";
import "./NavbarStyle.css";
import { NavbarItems } from "./NavbarItems";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";


class Navbar extends Component{

    state = {clicked: false};
    handleClick = (event) => {
      event.preventDefault();
      //window.location.href = '/login';
        this.setState({ clicked: !this.state.clicked });
    }

    render(){

      const { navigate } = this.props;
        return(
            <nav className="NavbarItems">
                <img className="Navbar-logo" src= "/images/Project_Logo.png" alt="Registration"/>

                <ul className={this.state.clicked ? "Nav-menu active" : "Nav-menu"}>

                    {NavbarItems.map((item, index) =>{
                     return(
                        <li key={index}>
                        <Link className = {item.cName} to= {item.url}>{item.title}</Link>
                    </li>
                     )
                    })} 
                </ul>
                <div className="Profile-section">
                  <div className="Profile-content">
                    <div className="Profile-photo-container">
                      <img className="Profile-photo" src="/images/profile.png" alt="Profile" />
                    </div>
                    <div className="UserProfile-container">
                      <UserProfile roleName={this.props.roleName} username={this.props.username} />
                    </div>
                  </div>
                  <button className="Logout-btn" 
                   onClick= {()=> {
                    const confirmLogout = window.confirm("Are you sure you want to log out?");
                    if (confirmLogout) {
                      localStorage.clear(); window.location.href = '/login'
                    }
                   }}>
                    Log out
                    </button>
                </div>

                {/* Resposive navbar */}
                <div className="menu-icons" onClick={
                    this.handleClick}>    
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </nav>
        );
    }
}

export default function(props) {
  const navigate = useNavigate();

  return <Navbar {...props} navigate={navigate} />;
}