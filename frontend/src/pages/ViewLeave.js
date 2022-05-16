import React from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';




function ViewLeave(props) {

  const arr = props.data;



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
              <th>#</th>
              <th>Start Day of Absence</th>
              <th>Duration</th>
              <th>Type of Leave</th>
              <th>Reason</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>

            {arr.map((leave_arr) =>
              <tr>
                <td>{leave_arr.id}</td>
                <td>{leave_arr.start_date}</td>
                <td>{leave_arr.duration}</td>
                <td>{leave_arr.type}</td>
                <td>{leave_arr.description}</td>
                <td>{leave_arr.file}</td>

                </tr>
            )};



          </tbody>
        </Table>
      </div>
      <Footer/>

    </div>
  )
}


export default ViewLeave;