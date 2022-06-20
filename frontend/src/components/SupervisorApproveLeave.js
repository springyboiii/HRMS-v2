import React from "react";
import Table from "react-bootstrap/Table";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Header from "./Header";
import Leaves from "./Leaves";
import { ConeStriped } from "react-bootstrap-icons";

function SupervisorApproveLeave(props) {
  const arr = props.leaves;
  // console.log(arr);

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

  const acceptRequest = (leaveid,emp_id,duration) => {


    Axios.get(`http://localhost:3001/api/getBalanceLeave/${emp_id}`).then((response)=>{
      console.log(emp_id)
      var Leaves_left=response.data['Leaves_left']
      console.log(Leaves_left)
      
    Axios.post("http://localhost:3001/api/sendApproval", {
      status: "Accepted",
      leave_id: leaveid,
      employee_id:emp_id,
      Leaves_left:Leaves_left-duration
    }).then(() => {
      window.location.reload(false);

      // alert("Success!");
    });
  })

};
  const declineRequest = (data) => {
    Axios.post("http://localhost:3001/api/sendRejection", {
      status: "Declined",
      leave_id: data,
    }).then(() => {
      // alert("Success!");
      window.location.reload(false);

    });
  };

  return (
    <div>
      <Header/>

      <div
        className="container"
      >
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
            {arr.map((leave, index) => (
              <tr key={index} data-index={index}>
                <td>{leave.leave_id}</td>
                <td>{leave.duration}</td>
                <td>{dateFormatter(leave.start_date)}</td>
                <td>{leave.description}</td>

                <td>{leave.type}</td>

                <td>{leave.employee_id}</td>

                <td style={{ display: "flex" }}>
                  <Button
                    variant="success"
                    onClick={() => {acceptRequest(leave.leave_id,leave.employee_id,leave.duration)}}
                    size="lg"
                    type="submit"
                  >
                    Accept
                  </Button>
                  {""}
                  <Button
                    size="lg"
                    variant="danger"
                    onClick={() => {declineRequest(leave.leave_id)}}

                    
                    style={{ marginLeft: "2px" }}
                  >
                    Decline
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
}

export default SupervisorApproveLeave;
