import { useState } from "react";

import Navbar from '../components/Navbar';

import { useNavigate } from "react-router-dom";
import Leaves from '../components/Leaves';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import SupervisorApproveLeave from '../components/SupervisorApproveLeave';
import Footer from '../components/Footer';
import Employee from "../components/Employee";
import {useForm} from "react-hook-form";



function Home() {
  const navigate = useNavigate();

  const [employee,setEmployee]=useState({
    id:1,
    firstname:"Nishaa",
    lastname:"Thalaivi",
    email:"gnishaa7@gmail.com",
    dob:"1999-12-07",
    isFemale:false,
    addressNo:"5",
    street:"Manning place",
    city:"Colombo",
    employeeId:4,
    startDate:"2020-01-01",
    department:"2",
    payGrade:"1",
    jobTitle:"3",
    employmentStatus:"permanent",
    partTime:true,
    supervisor:false,
    salary:5000
    });

    const {register, handleSubmit, formState:{errors}} = useForm();
  
  return (
    <>
    
    <Employee employee={employee} register={register} errors={errors} disabled={1} editEmployee={false}/>


      </>
  );
};

export default Home;
