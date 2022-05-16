import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Employee from "./Employee";
import Employees from "./Employees";
import { useState } from "react";
import { TypeH1 } from "react-bootstrap-icons";
import {useForm} from "react-hook-form";
const SelectEmployee = ({employees}) => {
    const [showEmployee,setShowEmployee]=useState(false);
  const navigate = useNavigate();
  
  const handleSubmitButton = (event) => {
    event.preventDefault();
    // alert(`The id you entered was: ${id}`)
    setShowEmployee(true);
    // alert(showEmployee)
  }
  const [id, setID] = useState("");
  const {register, handleSubmit, formState:{errors}} = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <div>
      <Navbar />{ !showEmployee ?
      <form onSubmit={handleSubmitButton}>
      <label htmlFor="">Enter ID
      <input
          type="text" 
          value={id}
          onChange={(e) => setID(e.target.value)}
        /></label>
        <input type="submit" />
        </form>
        :
        <div>
        {employees.map((employee) => employee.employeeId == id && <Employee key ={employee.id}employee={employee} register={register} errors={errors} disabled={0} editEmployee={true}/>
        )}
        <Button className = "btn" onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
            Click here to submit form
         </Button>
        </div>
        
        }
      
      <Footer />
    </div>
  );
};

export default SelectEmployee;
