import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Employee from "./Employee";
import Employees from "./Employees";
import { useState } from "react";
import { TypeH1 } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { Container } from "react-bootstrap";
import ReactCardFlip from 'react-card-flip';
import { Card } from "react-bootstrap";

const SelectEmployee = ({ employees }) => {
  const [showEmployee, setShowEmployee] = useState(false);
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  const handleSubmitButton = (event) => {
    event.preventDefault();
    // alert(`The id you entered was: ${id}`)
    setShowEmployee(true);
    // alert(showEmployee)
    setFlipped(!flipped);
  }

  const [id, setID] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setFlipped(!flipped);
  }

  return (
    <div>
      {/* <Navbar />{ !showEmployee ?
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
      
      <Footer /> */}

      <Header />
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="container text-center">
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
              <Card body border="info" className="shadow-lg" style={{ "paddingLeft": "0px", "paddingRight": "0px", backgroundColor: "#d2ebeb" }}>
                <Card.Body className="text-center">
                  <div>
                    {employees.map((employee) => employee.employeeId == id && <Employee key={employee.id} employee={employee} register={register} errors={errors} disabled={0} editEmployee={true} />
                    )}
                    <Button className="btn" onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
                      Click here to submit form
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </ReactCardFlip>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>



      <Footer />
    </div>
  );
};

export default SelectEmployee;
