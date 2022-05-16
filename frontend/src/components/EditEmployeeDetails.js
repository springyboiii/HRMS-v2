import React from "react";
import Employees from "./Employees";
import { useState } from 'react';
import {useForm} from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Employee from "./Employee";
import Navbar from "./Navbar";
import Footer from "./Footer";
const EditEmployeeDetails = () => {
  // const {register, handleSubmit, formState:{errors}} = useForm();

  //     const [employee, setEmployee] = useState({})

  return (
    <div>
      <Navbar /> 
   
      <Footer />
    </div>
  );
};

export default EditEmployeeDetails;
