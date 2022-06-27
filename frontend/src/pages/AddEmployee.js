import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import Employee from '../components/Employee';
import { useState,useEffect,useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Axios from 'axios';
import { UserTypeContext } from '../contexts/UserTypeContext';

const AddEmployee = ({ addEmployeeDetails }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { UserType, setUserType } = useContext(UserTypeContext);
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({})

  useEffect(()=>{
    if (UserType[0].jobTitle != 1 && UserType[0].jobTitle != 2){
      navigate('/dummy', { replace: true });
    }
 
      
  },[])

  const onSubmit = (data) => {

    Axios.post('http://localhost:3001/api/insertUser', {
      employeeData: data
    }).then((response) => {
      // alert("Voila user added")
      console.log(response.data)
      if (response.data.message) {
        alert(response.data.message);
        return;
      } else {

        Axios.post('http://localhost:3001/api/insertEmployee', {
          employeeData: data
        }).then((response) => {
          console.log(response)
          alert(response.data.message)
          // alert("Voila")
          setEmployee(data);
          addEmployeeDetails(data);
          setEmployee("");
          window.location.reload(false);
        })
        alert("Employee Added")
        //redirect somehwere


      }

    })
      ;


  }

  // setEmployee({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   dob: "",
  //   isFemale: null,
  //   addressNo: "",
  //   street: "",
  //   city: "",
  //   startDate: "",
  //   department: "",
  //   payGrade: "",
  //   jobTitle: "",
  //   employmentStatus: "",
  //   partTime: null,
  //   supervisor: null,
  //   salary: ""
  // })






  return (
    <div className="addempdiv">
      <Form>
        <Header/>
        <Employee employee={employee} register={register} errors={errors} disabled={0} editEmployee={0}/>
        <Button className="btn" onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
          Click here to submit form
        </Button>
      </Form>
      <Footer />
    </div>
  )
}

export default AddEmployee