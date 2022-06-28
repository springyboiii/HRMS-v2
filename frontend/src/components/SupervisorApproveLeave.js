import React from "react";
import Table from "react-bootstrap/Table";
import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Header from "./Header";
import Leaves from "./Leaves";
import { ConeStriped } from "react-bootstrap-icons";
import { UserTypeContext } from "../contexts/UserTypeContext";
import { UserContext } from "../contexts/UserContext";


function SupervisorApproveLeave(props) {
  const navigate = useNavigate();
  // const { UserType, setUserType } = useContext(UserTypeContext);
  // const { Username, setUsername } = useContext(UserContext);
  const Username= JSON.parse(localStorage.getItem('username'));
  const supervisor =localStorage.getItem('supervisor');

  const [pendleaves,setPending]=useState([]);
  
  // console.log(Username)



  useEffect(()=>{
    if (supervisor != 1){
      navigate('/dummy', { replace: true });
    }
    else{
      Axios.get(`http://localhost:3001/api/geteId/${Username}`).then((response)=>{
        console.log(response)
        var empId=response.data.employee_id
        // console.log(empId)
        Axios.get(`http://localhost:3001/api/leave/${empId}`).then((response) => {

        setPending(...pendleaves,response.data);
      
      // setLeave(response.data);
    // })
  });
    });

    }
 
    
      
  },[])

  // const arr=pendleaves;
 



  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

  const acceptRequest = (leaveid, emp_id, duration) => {
    Axios.get(`http://localhost:3001/api/getBalanceLeave/${emp_id}`).then(
      (response) => {
        console.log(emp_id);
        var Leaves_left = response.data["Leaves_left"];
        console.log(Leaves_left);

        Axios.post("http://localhost:3001/api/sendApproval", {
          status: "Accepted",
          leave_id: leaveid,
          employee_id: emp_id,
          Leaves_left: Leaves_left - duration,
        }).then(() => {
          window.location.reload(false);

          // alert("Success!");
        });
      }
    );
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
      <Header />

      <div className="container">
        <Table striped bordered hover variant="dark" style={{textAlign: "center"}}>
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
          <tbody >
            {pendleaves.map((leave, index) => (
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
                    onClick={() => {
                      acceptRequest(
                        leave.leave_id,
                        leave.employee_id,
                        leave.duration
                      );
                    }}
                    size="sm"
                    type="submit"
                  >
                    Accept
                  </Button>
                  {""}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      declineRequest(leave.leave_id);
                    }}
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
