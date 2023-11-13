import "./FooterStyles.css";

const Footer = () =>{
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <img alt="Logo" src="/images/Project_Logo.png"/>
                    <p>Enhance your construction quality.</p>
                </div>

                <div>
                    <a href="/">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="/">
                        <i className="fab fa-facebook"/>
                    </a>
                    <a href="/">
                        <i className="fab fa-twitter"/>
                    </a>
                </div>
            </div>

            <div className="bottom">
                <div>
                    <h4>Company</h4>
                    <p>ABC Constructions <p/>Private Limited</p>
                </div>
                <div>
                    <h4>Project</h4>
                    <p>Car Parking & <p/>Mixed Development Project</p>
                </div>
                <div>
                    <h4>Address</h4>
                    <p>No: 450D, R De Mel Mawatha, <p/>Bambalapitiya </p>
                </div>
                <div>
                    <h4>Contacts</h4>
                    <p>www.projectpulse@gmail.com</p>
                    <p>071 534 45 46</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;

