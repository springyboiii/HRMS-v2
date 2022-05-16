import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm} from "react-hook-form";
import Employee from '../components/Employee';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const EditEmployee = () => {

    const onSubmit = (data) => {
        console.log(data);
      }

      const {register, handleSubmit, formState:{errors}} = useForm();

      const [employee, setEmployee] = useState({})

  return (
    <div className="addempdiv">
      
        {<Form>
          <Navbar/>
        {/* <Employee employee={employee} register={register} errors={errors} disabled={0} editEmployee={true} /> */}
        <h1>Edit Employee</h1>
            
         
        </Form>}
        <Footer/>
    </div>
  )
}

export default EditEmployee