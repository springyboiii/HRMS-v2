import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm} from "react-hook-form";
import Employee from '../components/Employee';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Axios from 'axios';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const EditEmployee = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [employee, setEmployee] = useState({})

  const getDateString = (dateString) => {
    var dateString = new Date(dateString);
    const dd = String(dateString.getDate()).padStart(2, "0");
    const mm = String(dateString.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = dateString.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/getemps').then((response)=>{
      // console.log(response.data)
      response.data.startDate = getDateString(response.data.startDate)
      response.data.dob = getDateString(response.data.dob)
      setEmployee(response.data)
    })
  }, []);

  const onSubmit = (data) => {
    console.log(data.firstname);
    console.log(data.dob);
    const {navigation} = this.props;
    // const { employeeId } = route.params;
    data['employee_id'] = navigation.getParam('employeeId')
    Axios.put('http://localhost:3001/api/updateEmployee', {
      employeeData: data
    }).then((response)=>{
      alert(response.data.message);
    })

  } 



  return (
    <div className="addempdiv">

      {<Form>
        <Navbar />
        <h1>Edit Employee</h1>
        <Employee employee={employee} register={register} errors={errors} disabled={0} editEmployee={true} />
        <Button className="btn" onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
          Click here to submit form
        </Button>


      </Form>}
      <Footer />
    </div>
  )
}

export default EditEmployee