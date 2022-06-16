import { useState, useEffect } from "react";

import Navbar from '../components/Navbar';

import { useNavigate } from "react-router-dom";
import Leaves from '../components/Leaves';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import SupervisorApproveLeave from '../components/SupervisorApproveLeave';
import Footer from '../components/Footer';
import Employee from "../components/Employee";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';



function Home() {
  const { Username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [show, setShow] = useState(false);
  const delay = 5;

  const { register, handleSubmit, formState: { errors } } = useForm();

  var id = Username; //"niru@gmail.com";
  console.log(Username);


  const getDateString = (dateString) => {
    var dateString = new Date(dateString);
    const dd = String(dateString.getDate()).padStart(2, "0");
    const mm = String(dateString.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = dateString.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    // Axios.post('http://localhost:3001/api/getEmployee', {
    //   email: username
    // }).then((response) => {
    //   response.data.startDate = getDateString(response.data.startDate)
    //   response.data.dob = getDateString(response.data.dob)
    //   setEmployee(response.data)
    // });
    let timer1 = setTimeout(() => setShow(true), delay * 1000);

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer1);
      console.log(Username);

      Axios.get(`http://localhost:3001/api/getemps/${Username}`).then((response) => {
        // console.log(response.data)
        response.data.startDate = getDateString(response.data.startDate)
        response.data.dob = getDateString(response.data.dob)
        setEmployee(response.data)
      })
    };
    // console.log(Username);

    // Axios.get(`http://localhost:3001/api/getemps/${Username}`).then((response) => {
    //   // console.log(response.data)
    //   response.data.startDate = getDateString(response.data.startDate)
    //   response.data.dob = getDateString(response.data.dob)
    //   setEmployee(response.data)
    // })
  }, [])

  return (
    <>
      <Header />

      <div className="text-center"><h3>Personal Information</h3></div>

      <Employee employee={employee} register={register} errors={errors} disabled={1} editEmployee={false} />

      <Footer />
    </>
  );
};

export default Home;

// id:1,
//     firstname:"Nishaa",
//     lastname:"Thalaivi",
//     email:"gnishaa7@gmail.com",
//     dob:"1999-12-07",
//     isFemale:false,
//     addressNo:"5",
//     street:"Manning place",
//     city:"Colombo",
//     employeeId:4,
//     startDate:"2020-01-01",
//     department:"2",
//     payGrade:"1",
//     jobTitle:"3",
//     employmentStatus:"permanent",
//     partTime:true,
//     supervisor:false,
//     salary:5000
