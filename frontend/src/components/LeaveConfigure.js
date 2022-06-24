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
import EditLeaveForm from "./EditLeaveForm";

const LeaveConfigure2= ({ employees }) => {
  const [showEmployee, setShowEmployee] = useState(false);
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  const [employee, setEmployee] = useState({})

  const [id, setID] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    data['employee_id'] = id
    console.log(data);
    console.log(employee);
    Axios.put('http://localhost:3001/api/updateLeaves', {
      employeeData: employee
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



const handleSubmitButton = (event) => {
  event.preventDefault();
  console.log(id);

  Axios.get(`http://localhost:3001/api/getemps2/${id}`).then((response)=>{
    // console.log(response.data)
    response.data.startDate = getDateString(response.data.startDate)
    response.data.dob = getDateString(response.data.dob)
    setEmployee(response.data)
    console.log(employee.firstname)
  })   
  setFlipped(!flipped);
}


  return (
    <div>
    

      <Header />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="container">
            <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
              <Card style={{ "paddingLeft": "0px", "paddingRight": "0px" }} className="shadow-lg" >
                <Card.Img variant="top" src="/search4.gif" height="350" />
                <Card.Body>
                  <Card.Title>Select an Employee</Card.Title>
                  <form onSubmit={handleSubmitButton}>
                    <label htmlFor="">Enter an employee ID to edit leave details
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
                   
                    <h4 className="text-center">{employee.firstname} {employee.lastname}'s Leave Information</h4><br></br>
                    <EditLeaveForm key={employee.id} employee={employee} register={register} errors={errors} disabled={0} editEmployee={false} editLeaves={true}/>
                    <Button className="btn1" onClick={handleSubmit(onSubmit)} variant="primary" type="submit" >
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

export default LeaveConfigure2;
