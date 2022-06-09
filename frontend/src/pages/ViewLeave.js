import React from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';




function ViewLeave(props) {

  const arr = props.data;
  var x=1;
  var type="";

  function leaveType(type){
    switch (type){
      case 1:
        type="Annual Leave";
        break;
      case 2:
        type="Sick Leave";
        break;
      case 3:
        type="Maternity Leave";
        break;
      case 4:
        type="Parental Leave";
        break;
      case 5:
        type="Unpaid Leave";
        break;      
      case 6:
        type="Other";
        break;
    }
    return type;
  }


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
            // {switch (leave_arr.type){
            //   case "1":
            //     type="Annual Leave";
            //     break;
            //   case "2":
            //     type="Sick Leave";
            //     break;
            //   case "3":
            //     type="Maternity Leave";
            //     break;
            //   case "4":
            //     type="Parental Leave";
            //     break;
            //   case "5":
            //     type="Unpaid Leave";
            //     break;      
            //   case "6":
            //     type="Other";
            //     break;
            // }},

              <tr>
                <td>{x++}</td>
                <td>{((leave_arr.start_date).toString()).slice(0,10)}</td>
                <td>{leave_arr.duration}</td>
                <td>{leaveType(leave_arr.type)}</td>
                <td>{leave_arr.description}</td>
                <td>{leave_arr.document}</td>
             

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