import { Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import addImg from "../images/edit-icon-pencil-icon-sign-up-icon-vector-30669569.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState,useContext,useEffect} from "react";
import '../components/Modal.css';
import { ReactDOM } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Axios from "axios";
import Header from "../components/Header";
import { UserTypeContext } from '../contexts/UserTypeContext';


const PaygradeLeaveConfigure = (props) => {
  const [open, setOpen] = useState(false);
  const[paygrade,setPaygrade] = useState(1);
  const[leaves,setLeaves] = useState(1);
  const navigate = useNavigate();
  // const { UserType, setUserType } = useContext(UserTypeContext);
  const payGrade =JSON.parse(localStorage.getItem('payGrade'));
  console.log(payGrade);


  const paygradeleaves = props.paygradeleaves;  


  useEffect(()=>{
    if (payGrade != 3){
      navigate('/dummy', { replace: true });
    }
      
  },[])
   


  const editLeaves = (data,leaves) => {
    setOpen(true);
    setPaygrade(data);
    setLeaves(leaves);
    
  };

  const saveLeaveChanges = () => {
    setOpen(false);
    Axios.post("http://localhost:3001/api/savePaygradeLeaveChanges", {
      payGrade:paygrade,
      leaves: leaves
    }).then(() => {
      console.log(leaves)

      window.location.reload(false);

      // alert("Success!");
    });
  }
  
   
   

    



  return (
    <>
    <Header/>
    <br></br>
      <h1 style={{
            textAlign: "center",
            marginLeft: "110px",
            // color: "green"
          }}>Leave Configuration</h1><br></br>
      <Table striped bordered hover variant="dark" style={{width:"50%", textAlign:"center", marginLeft: "380px"}}>
        <thead>
          <tr>
            <th>PayGrade</th>
            <th>Assigned Leaves</th>
            <th> Edit</th>
          </tr>
        </thead>
        <tbody>
        {paygradeleaves.map((paygradeleave, index) => (
              <tr data-index={index} key={index}>
                <td>{paygradeleave.payGrade}</td>
                <td>{paygradeleave.leaves}</td>
                <td>
              {" "}
              <Button size="sm" onClick={() => editLeaves(paygradeleave.payGrade,paygradeleave.leaves)}>
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
            <Form.Label>Assigned Leaves</Form.Label>
            <Form.Control type="text"  defaultValue={leaves} onChange={e => setLeaves(e.target.value)} />
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

export default PaygradeLeaveConfigure;
