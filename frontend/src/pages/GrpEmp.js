import React,{useState,useEffect,useContext} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import { UserTypeContext } from '../contexts/UserTypeContext';
import { useNavigate } from "react-router-dom";

function GrpEmp(){

  const [dept, setDept] = useState(null);
  const [payGrade, setPayGrade] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);

  const [open,setOpen]=useState(false);
  const [emp,setEmp]=useState([]);
  const { UserType, setUserType } = useContext(UserTypeContext);
  const navigate = useNavigate();
  const title=JSON.parse(localStorage.getItem('title'));

  // const Results = () => (
  //   // <div className='container'>
  //   //     <Table striped bordered hover variant="dark">
  //   //       <thead>
  //   //         <tr>
  //   //           <th>#</th>
  //   //           <th>First Name</th>
              
  //   //         </tr>
  //   //       </thead>
  //   //       <tbody>

  //   //         {emp.map((arr) =>
          
  //   //           <tr>
  
               
  //   //             <td>{arr.employee_id}</td>
               
  //   //             <td>{arr.firstname}</td>
     
             

  //   //             </tr>
                
  //   //         )};



  //   //       </tbody>
  //   //     </Table>
  //   //   </div>
  // )
  useEffect(()=>{
    if (title != 3){
      navigate('/dummy', { replace: true });
    }
 
      
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();   

    Axios.post("http://localhost:3001/api/GrpEmp", {
        dept:dept,
        jobTitle:jobTitle,
        payGrade:payGrade

    }).then((response) => {
      console.log(response,"GrpEmp")
            setEmp(...emp,response.data)


      
    }) 
    // Axios.get(`http://localhost:3001/api/grpemp/${dept}`).then((response)=>{
    //   console.log(response.data)
    //   // setEmp(...emp,[]);
    //   console.log(emp);
    //   setEmp(...emp,response.data)
    //   console.log(emp)
    //   setOpen(true)
    //   // emp=response.data
    //   // console.log(emp);
    //   // empId=response.data.employee_id
      
    //   // console.log(empId)
    // })
    
  }

  function EmpStatus(type){
    switch (type){
      case "1":
        type="Intern";
        break;
      case "2":
        type="Contract";
        break;
      case "3":
        type="Permanent";
        break;
      case "4":
        type="Freelance";
        break;
      
    }
    return type;
  }

  function PartTime(type){
    switch (type){
      case 0:
        type="No";
        break;
      case 1:
        type="Yes";
        break;
      
      
    }
    return type;
  }

  function JobTitle(type){
    switch (type){
      case "1":
        type="HR Manager";
        break;
      case "2":
        type="Admin";
        break;
      case "3":
        type="Manager";
        break;
      case "4":
        type="Software Engineer";
        break;
      
    }
    return type;
  }





  return (

    <div>
      <Header />
      <div className='signcontainer'>
      <Form>
      <Form.Group>
            Select the Department
            <br></br>

            <Form.Select aria-label="Default select example" id='department' name='department' value={dept} onChange={(e) => { setDept(null); setDept(e.target.value); setEmp([])}}>
            <option></option>
          <option value="1">Department 1</option>
          <option value="2">Department 2</option>
          <option value="3">Department 3</option>
            </Form.Select>
          {/* </Form.Group> */}
          <br></br>
          Select the Job Title
            <br></br>

            <Form.Select aria-label="Default select example" id='JobTitle' name='JobTitle' value={jobTitle} onChange={(e) => {  setJobTitle(null);setJobTitle(e.target.value);setEmp([]) }}>
            <option></option>
          <option value="1"> HR Manager</option>
          <option value="2">Admin</option>
          <option value="3">Manager</option>
          <option value="4">Software Engineer</option>

            </Form.Select>
            <br />
            Select the Pay Grade
            <br></br>

            <Form.Select aria-label="Default select example" id='PayGrade' name='PayGrade' value={payGrade} onChange={(e) => { setPayGrade(null);setPayGrade(e.target.value);setEmp([]) }}>
            <option></option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
            </Form.Select>
          </Form.Group>
          <br></br>
          <Button onClick={handleSubmit} variant="primary" type="submit">
              Submit
            </Button>
      </Form>
      </div>
     
      {/* <select id='type' name='type' value={dept} onChange={(e) => { setDept(null); setDept(e.target.value); setEmp([]);}}>
          <option></option>
          <option value="1">Department 1</option>
          <option value="2">Department 2</option>
          <option value="3">Department 3</option>
         </select><span></span> */}

         

      {/* <h1>{ open ? <Results /> : null }</h1> */}
      <div className='container'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Employee_Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employment Status</th>
              <th>Part Time</th>
              <th>Job Title</th>
              
            </tr>
          </thead>
          <tbody>
            

            {emp.map((arr) =>
          
              <tr>
  
               
                <td>{arr.employee_id}</td>
               
                <td>{arr.firstname}</td>
                <td>{arr.lastname}</td>
                <td>{EmpStatus(arr.employmentStatus)}</td>
                <td>{PartTime(arr.partTime)}</td>
                <td>{JobTitle(arr.jobTitle)}</td>
     
             

                </tr>
                
            )};



          </tbody>
          
        </Table>
        
      </div>
      
      <Footer />
    </div>
  )
}

export default GrpEmp