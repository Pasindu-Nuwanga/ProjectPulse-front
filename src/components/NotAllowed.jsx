import { useNavigate } from "react-router-dom";

 
const NotAllowed = () => {
  const navigate = useNavigate();
 
  return (
    <div>
      <div>You can't access this page. Please Login!</div>
  
        <button type="primary" onClick={() => navigate("/login")}>Back to Login</button>

    </div>
  );
};

export default NotAllowed;