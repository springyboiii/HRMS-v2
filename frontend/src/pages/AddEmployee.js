import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm} from "react-hook-form";
import Employee from '../components/Employee';
import { useState } from 'react';
import Footer from '../components/Footer';

const AddEmployee = ({addEmployeeDetails}) => {

    const onSubmit = (data) => {
        console.log(data);
        setEmployee(data);
        addEmployeeDetails(data);
      }

      const {register, handleSubmit, formState:{errors}} = useForm();

      const [employee, setEmployee] = useState({})

  return (
    <div className="addempdiv">
        <Form>
        <Employee employee={employee} register={register} errors={errors} disabled={0}/>
        <Button className = "btn" onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
            Click here to submit form
         </Button>
        </Form>
        <Footer/>
    </div>
  )
}

export default AddEmployee