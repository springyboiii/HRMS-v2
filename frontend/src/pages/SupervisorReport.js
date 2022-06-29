import React,{useState,useEffect,useContext,useRef} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import { UserTypeContext } from '../contexts/UserTypeContext';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
function SupervisorReport(){

  const [sup,setSup] = useState(null);
  const [open,setOpen]=useState(false);
  const [emp,setEmp]=useState([]);
  const toast = useRef(null);

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
    Axios.get(`http://localhost:3001/api/isemp/${sup}`).then((response)=>{
        console.log(sup);
        console.log(response.data);
        if (response.data.length===0){
            toast.current.show({ severity: 'info', summary: 'Invalid employee id', detail: 'please enter a valid employee id.', life: 5000 });
        }
        else{
            Axios.get(`http://localhost:3001/api/issup/${sup}`).then((response)=>{
                console.log(response.data)
                if(response.data.supervisor==0){
                    toast.current.show({ severity: 'info', summary: 'Not a supervisor', detail: '', life: 5000 });
                }
                else{
                    Axios.get(`http://localhost:3001/api/supemp/${sup}`).then((response)=>{
                        console.log(response.data)
                        if (response.data.length===0){
                            toast.current.show({ severity: 'info', summary: 'No employees under the supervisor', detail: '', life: 5000 });
                        }
                        else{
                            setEmp(...emp,response.data)
                            console.log(emp)
                        }
                        
                    })

                }

            })

        }

    })

    // Axios.get(`http://localhost:3001/api/getdeptemp/${dept}`).then((response)=>{
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
    
    event.preventDefault();   
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
      <Toast ref={toast} position="top-center"/>
      <Form>
      <Form.Group>
            Enter the Employee ID of Supervisor
            <br></br>

            <Form.Control type="number" min="1" id="supervisor" name='supervisor' value={sup} onChange={(e) => {  setSup(null); setSup(e.target.value); setEmp([]);  }}/>
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

export default SupervisorReport