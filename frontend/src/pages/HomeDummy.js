
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
function HomeDummy() {
  const navigate = useNavigate();
  return (
    <div >
        
      
        <h1>Human Resource Management System</h1>
        <br />
        <h2>Welcome to home page</h2>
        
        <Button onClick={() => navigate("/addEmployee")}>Add Employee</Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/LeaveConfigure")}>Leave Configuration</Button> 
        <Button onClick={() => navigate("/components/SupervisorApproveLeave")}>Supervisor Function 1</Button> 
        <Button onClick={() => navigate("/home")}>Dashboard</Button> 
         
      
    </div>
  );
}

export default HomeDummy;
