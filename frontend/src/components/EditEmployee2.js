import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Employee from "./Employee";
import Employees from "./Employees";
import { useState, useEffect } from "react";
import { TypeH1 } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { Container } from "react-bootstrap";
import ReactCardFlip from 'react-card-flip';
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Axios from 'axios';

const EditEmployee2 = ({ employees }) => {
  const [showEmployee, setShowEmployee] = useState(false);
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  const [employee, setEmployee] = useState({})

  const [id, setID] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    data['employee_id'] = id
    Axios.put('http://localhost:3001/api/updateEmployee', {
      employeeData: data
    }).then((response)=>{
      alert(response.data.message);
    })
    setFlipped(!flipped);
  }


  

  const getDateString = (dateString) => {
    var dateString = new Date(dateString);
    const dd = String(dateString.getDate()).padStart(2, "0");
    const mm = String(dateString.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = dateString.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

//   useEffect(()=>{
//     Axios.get('http://localhost:3001/api/getemps').then((response)=>{
//       // console.log(response.data)
//       response.data.startDate = getDateString(response.data.startDate)
//       response.data.dob = getDateString(response.data.dob)
//       setEmployee(response.data)
//     })
//   }, []);

  const handleSubmitButton = (event) => {
    event.preventDefault();
    // <Link
    //   to={{
    //     pathname: "/editEmployeeDetails",
    //     state: {employeeId: id} // your data array of objects
    //   }}
    // ></Link>
    // this.props.navigation.navigate('/editEmployeeDetails', {
    //   employeeId: id
    // });
    // navigate('/editEmployeeDetails',{
    //   employeeId: id
    // });
    // alert(`The id you entered was: ${id}`)
    // setShowEmployee(true);
    // alert(showEmployee) 
    Axios.get('http://localhost:3001/api/getemps').then((response)=>{
      // console.log(response.data)
      response.data.startDate = getDateString(response.data.startDate)
      response.data.dob = getDateString(response.data.dob)
      setEmployee(response.data)
      console.log(employee)
    })   
    setFlipped(!flipped);
  }

  return (
    <div>
      {/* <Navbar />{!showEmployee ?
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
          {employees.map((employee) => employee.employeeId === id && <Employee key={employee.id} employee={employee} register={register} errors={errors} disabled={0} editEmployee={true} />
          )}
          <Button className="btn" onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
            Click here to submit form
          </Button>
        </div>

      }

      <Footer /> */}

      <Header />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="container">
            <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
              <Card style={{ "paddingLeft": "0px", "paddingRight": "0px" }} className="shadow-lg" >
                <Card.Img variant="top" src="/search.png" height="350" />
                <Card.Body>
                  <Card.Title>Select an Employee</Card.Title>
                  <form onSubmit={handleSubmitButton}>
                    <label htmlFor="">Enter an employee ID to view details
                      <input
                        type="text"
                        className="form-control"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                      />
                    </label>
                    <input className="btn btn-primary" type="submit" />
                  </form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                    {/* {employees.map((employee) => employee.employeeId === id && <Employee key={employee.id} employee={employee} register={register} errors={errors} disabled={0} editEmployee={true} />
                    )} */}
                    <h4 className="text-center">{employee.firstname}'s Personal Information</h4>
                    <Employee key={employee.id} employee={employee} register={register} errors={errors} disabled={0} editEmployee={true}/>
                    <Button className="btn" onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
                      Click here to submit form
                    </Button>
                </Card.Body>
              </Card>
            </ReactCardFlip>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>



      <Footer />
    </div>
  );
};

export default EditEmployee2;
