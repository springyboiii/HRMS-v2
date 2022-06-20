

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeDummy from './pages/HomeDummy';
import LeaveConfigure from './components/LeaveConfigure';
import { useState,useEffect,useContext } from "react";
import EditEmployee from "./pages/EditEmployee";

import Home from './pages/Home';
import Navbar from './components/Navbar';

import LeaveApplication from './pages/LeaveApplication';
import ViewLeave from './pages/ViewLeave';

import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";
import SelectEmployee from "./components/SelectEmployee";
import EditEmployee2 from "./components/EditEmployee2";
import Axios from 'axios';
import SupervisorApproveLeave from "./components/SupervisorApproveLeave";
import Homepage from "./components/Homepage";
import Dummy from "./pages/Dummy";
import ChangePassword from "./components/ChangePassword";
import { UserContext } from "./contexts/UserContext";

import DeptEmp from "./pages/DeptEmp";
import GrpEmp from "./pages/GrpEmp";
import TotalLeave from "./pages/totalLeave";
import { UserTypeContext } from "./contexts/UserTypeContext";


import Dashboard from "./pages/Dashboard";

function App() {
  const [leaves, setLeave] = useState([]);
  const [leavesLeft,setLeavesLeft]= useState([]);
  const [employees, setEmployees] = useState([]);
  const [pendleaves,setPending]=useState([]);
  const [Username, setUsername] = useState("Context");
  // const {userType,setUserType} = useContext(UserTypeContext);



  useEffect(()=>{
    
    Axios.get("http://localhost:3001/api/leave").then((response) => {

      setPending(...pendleaves,response.data);
      
      // setLeave(response.data);
    });
  },[]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/getleavesleft").then((response) => {

      setLeavesLeft(...leavesLeft,response.data);
      
      // setLeave(response.data);
    });
  },[]);




  useEffect(() => {
    if(localStorage.getItem('username')) {
      setUsername(JSON.parse(localStorage.getItem('username')));
    }
    // if(localStorage.getItem('payGrade')){
    //   setUserType(JSON.parse(localStorage.getItem('payGrade')));
    // }
  }, []);
  console.log(Username)
  // console.log(leaves);

  const addLeave = (start_Date,duration,type,description,file,status) => {
    // Axios.get("http://localhost:3001/api/getleave").then((response) => {

    //   setLeave(...leaves,response.data);
      
    //   // setLeave(response.data);
    // });
    switch (type){
      case "1":
        type="Annual Leave";
        break;
      case "2":
        type="Sick Leave";
        break;
      case "3":
        type="Maternity Leave";
        break;
      case "4":
        type="Parental Leave";
        break;
      case "5":
        type="Unpaid Leave";
        break;      
      case "6":
        type="Other";
        break;
    }
    // setLeave([...leave, name]);
    setLeave([...leaves,{

      id: 4,
      duration: duration,
      description: description,
      start_date: start_Date,
      type:type,
      employee_id:123,
      supervisor_id:321,
      document:file,
      leave_status:status
    }]);

   

  }
  const EditEmployeeDetails=(id)=>{
    setEmployees(employees.filter((employee)=> employee.id !== id));
  }

  const addEmployeeDetails = (employee) => {
    setEmployees([...employees, employee]);
  }


  return (
    <div >
        <Router>
          
        <Routes>
          {/* <Route path="/" element={<HomeDummy />} /> */}
          <Route path="/" element={<UserContext.Provider value={{ Username, setUsername }}><Homepage /></UserContext.Provider>} />
          <Route path="/dashboard" element={<Dashboard />} />
      
          <Route path="/SupervisorApproveLeave" element={<UserContext.Provider value={{ Username, setUsername }}><SupervisorApproveLeave leaves={pendleaves} /> </UserContext.Provider>} /> 
          <Route path="/components/SelectEmployee" element={<UserContext.Provider value={{ Username, setUsername }}><SelectEmployee employees={employees}/></UserContext.Provider>} />
          <Route path="/components/editEmployee" element={<UserContext.Provider value={{ Username, setUsername }}><EditEmployee2 employees={employees}/></UserContext.Provider>} />


          <Route path="/editEmployeeDetails" element={<UserContext.Provider value={{ Username, setUsername }}>{(props) => <EditEmployee{...props} />}</UserContext.Provider>} />

          <Route path='/home' exact element={<UserContext.Provider value={{ Username, setUsername }}>< Home /></UserContext.Provider>}></Route>
          <Route path='/leaveApplication' element={<UserContext.Provider value={{ Username, setUsername }}>< LeaveApplication handleSubmit={addLeave}/></UserContext.Provider>}></Route> 
          <Route path='/viewLeave' element={<UserContext.Provider value={{ Username, setUsername }}><ViewLeave data={leaves}/></UserContext.Provider>}></Route> 
          <Route path='/login' element={<UserContext.Provider value={{ Username, setUsername }}><Login /></UserContext.Provider>}></Route> 
          <Route path='/addEmployee' element={<UserContext.Provider value={{ Username, setUsername }}><AddEmployee addEmployeeDetails={addEmployeeDetails} /></UserContext.Provider>}></Route> 

          <Route path="/LeaveConfigure" element={<UserContext.Provider value={{ Username, setUsername }}><LeaveConfigure /></UserContext.Provider>} />
          <Route path="/changePassword" element={<UserContext.Provider value={{ Username, setUsername }}><ChangePassword /></UserContext.Provider>} />
          <Route path="/dummy" element={<UserContext.Provider value={{ Username, setUsername }}><Dummy /></UserContext.Provider>} />

          <Route path="/GenerateReport/EmployeebyDepartment" element={<UserContext.Provider value={{ Username, setUsername }}><DeptEmp /></UserContext.Provider>} />
          <Route path="/GenerateReport/TotalLeavesgivenbyDepartment" element={<UserContext.Provider value={{ Username, setUsername }}><TotalLeave /></UserContext.Provider>} />
          <Route path="/GenerateReport/Employeereportbygivencategory" element={<UserContext.Provider value={{ Username, setUsername }}><GrpEmp /></UserContext.Provider>} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
