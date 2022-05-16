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


const LeaveConfigure = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const students = [
    {
      'id': 100, 
      'name': 'Kamal', 
      'leaves': 50
    },
    {
      'id': 101, 
      'name': 'Sethu', 
      'leaves': 50
    },
    {
      'id': 102, 
      'name': 'Fahad', 
      'leaves': 50
    },
];

   

  //var openModal = () => setOpen({ open: false });
  //var closeModal = () => setOpen({ open: false });

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
        {students.map((student, index) => (
              <tr data-index={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.leaves}</td>
                <td>
              {" "}
              <Button size="lg" onClick={() => setOpen(true)}>
                <img src={addImg} alt="edit" width="18" /> Edit
              </Button>
            </td>

              </tr>
            ))}

            
            
          <tr>
            <td>103</td>
            <td>Loki</td>
            <td>65</td>
            <td>
              {" "}
              <Button size="lg" onClick={() => setOpen(true)}>
                <img src={addImg} alt="edit" width="18" /> Edit
              </Button>
            </td>
          </tr>

          <tr>
            <td>104</td>
            <td>Kanag</td>
            <td>72</td>
            <td>
              {" "}
              <Button size="lg">
                <img src={addImg} alt="edit" width="18" /> Edit
              </Button>
            </td>
          </tr>
         
          
        </tbody>
      </Table>

      <Modal  size ='xl' top='20%' dialogClassName='custom-dialog' show={open} >
        <Modal.Header closeButton onClick={() => setOpen(false)}>
          <Modal.Title>Leave Count</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Leaves Left</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
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
