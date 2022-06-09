import React from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import Button from "react-bootstrap/Button";
import addImg from "../images/edit-icon-pencil-icon-sign-up-icon-vector-30669569.jpg";
import Date from 'react';




function SupervisorApproveLeave(props) {

  const arr = props.leaves;
  console.log(arr);

  const dateFormatter = (date) => {
    return date.split("T")[0]
} 

  return (
    <div>
      <Navbar />

      <div style={{
        display: 'flex',
        margin: 'auto',
        width: 1500,
        padding: 30,
        textAlign: 'center'
      }}>

        <Table striped bordered hover variant="dark" >
          <thead>
            <tr>
              <th>Leave ID</th>
              
              <th>Duration</th>
              <th>Start Day of Absence</th>
              <th>Description</th>
              <th>Type</th>
              
              <th>Employee ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

          {arr.map((leave,index) => (
            
              <tr  data-index={index} key={index}>
                <td>{leave.leave_id}</td>
                <td>{leave.duration}</td>
                <td>{dateFormatter(leave.start_date)}</td>
                <td>{leave.description}</td>
                

                <td>{leave.type}</td>

                <td>{leave.employee_id}</td>

                <td style={{display: 'flex'}}>

                <Button variant='success' size="lg" >
                Accept
              </Button>
              {''}
              <Button  size="lg" variant="danger"  style={{marginLeft:"2px"}} >
                Decline
              </Button>
                </td>
                

          
              </tr>
            ))}

          </tbody>
        </Table>
      </div>
      <Footer/>

    </div>
  )
}


export default SupervisorApproveLeave;