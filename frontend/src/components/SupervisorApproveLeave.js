import React from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import Button from "react-bootstrap/Button";
import addImg from "../images/edit-icon-pencil-icon-sign-up-icon-vector-30669569.jpg";




function SupervisorApproveLeave(props) {

  const arr = props.leaves;
  console.log(arr);



  return (
    <div>
      <Navbar />

 

      <div style={{
        display: 'flex',
        margin: 'auto',
        width: 700,
        padding: 30
      }}>

        <Table striped bordered hover variant="dark">
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
                <td>{leave.start_date}</td>
                <td>{leave.description}</td>
                

                <td>{leave.type}</td>

                <td>{leave.employee_id}</td>

                <td style={{display: 'flex'}}>

                <Button size="lg" >
                Accept
              </Button>
              <Button size="lg" >
                Decline
              </Button>
                </td>
                

                {/* <td>{leave.description}</td> */}

                {/* <td>
              {" "}
              <Button size="lg" onClick={() => setOpen(true)}>
                <img src={addImg} alt="edit" width="18" /> Edit
              </Button>
            </td> */}

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