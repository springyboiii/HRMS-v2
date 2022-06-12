import { Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import addImg from "../images/edit-icon-pencil-icon-sign-up-icon-vector-30669569.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import '../components/Modal.css';
import { ReactDOM } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Axios from "axios";


const LeaveConfigure = (props) => {
  const [open, setOpen] = useState(false);
  const[emp_id,setemp_id] = useState(1);
  const[leavesCount,setLeavesCount] = useState(1);

  const leavesLeft = props.leavesLeft;  
  console.log(leavesLeft);
   


  const editLeaves = (data,leaves) => {
    setOpen(true);
    setemp_id(data);
    setLeavesCount(leaves);
    
  };

  const saveLeaveChanges = () => {
    setOpen(false);
    Axios.post("http://localhost:3001/api/saveLeaveChanges", {
      emp_id:emp_id,
      leavesLeft: leavesCount
    }).then(() => {
      console.log(leavesCount)

      window.location.reload(false);

      // alert("Success!");
    });
  }
  
   
   

    



  return (
    <>
    <Navbar />
    <br></br>
      <h1 style={{
            textAlign: "center",
            marginLeft: "200px",
            color: "green"
          }}>Leave Configuration</h1><br></br>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>

            <th>Number of Leaves Left</th>
            <th> Edit</th>
          </tr>
        </thead>
        <tbody>
        {leavesLeft.map((leave, index) => (
              <tr data-index={index} key={index}>
                <td>{leave.Employee_id}</td>
                <td>{leave.Firstname+" "+leave.Lastname}</td>
                <td>{leave.Leaves_left}</td>
                <td>
              {" "}
              <Button size="lg" onClick={() => editLeaves(leave.Employee_id,leave.Leaves_left)}>
                <img src={addImg} alt="edit" width="18" /> Edit
              </Button>
            </td>

              </tr>
            ))}
          
          
        </tbody>
      </Table>

      <Modal  size ='xl' top='20%' dialogClassName='custom-dialog' show={open} >
        <Modal.Header closeButton onClick={() => setOpen(false)}>
          <Modal.Title>Leave Count</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Leaves Left</Form.Label>
            <Form.Control type="text"  defaultValue={leavesCount} onChange={e => setLeavesCount(e.target.value)} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => saveLeaveChanges()}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer /> 
    </>
  );
};

export default LeaveConfigure;
