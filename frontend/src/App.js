

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupervisorApproveLeave from './components/SupervisorApproveLeave';
import HomeDummy from './pages/HomeDummy';
import LeaveConfigure from './pages/LeaveConfigure';
import { useState } from "react";
import EditEmployee from "./pages/EditEmployee";

import Home from './pages/Home';
import Navbar from './components/Navbar';

import LeaveApplication from './pages/LeaveApplication';
import ViewLeave from './pages/ViewLeave';

import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";
import SelectEmployee from "./components/SelectEmployee";

function App(props) {
  const [leaves, setLeave] = useState(props.data);
  const [employees, setEmployees] = useState(props.employees);
  function addLeave(start_Date,duration,type,description,file) {
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
      file:file,
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
          {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomeDummy />} />
          <Route path="/components/SupervisorApproveLeave" element={<SupervisorApproveLeave leaves={leaves}/>} />
          <Route path="/components/SelectEmployee" element={<SelectEmployee employees={employees}/>} />

          <Route path="/EditEmployeeDetails" element={<EditEmployee  />} />

          <Route path='/home' exact element={< Home />}></Route>
          <Route path='/leaveApplication' element={< LeaveApplication handleSubmit={addLeave}/>}></Route> 
          <Route path='/viewLeave' element={<ViewLeave data={leaves}/>}></Route> 
          <Route path='/login' element={<Login />}></Route> 
          <Route path='/addEmployee' element={<AddEmployee addEmployeeDetails={addEmployeeDetails} />}></Route> 

          <Route path="/LeaveConfigure" element={<LeaveConfigure />} />


        </Routes>
      </Router>
      
        
         
      
    </div>
  );
}

export default App;
