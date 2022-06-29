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
import { Link } from 'react-router-dom';


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
      default:
        break;
    }
    return type;
  }

 
  function leaveDocument(fName){
    if (fName!=null){
      var path="/uploads/"+fName;
      return (<Link to={path} target="_blank" download>{fName}</Link>)
    }
    else{
      return "No document";
    }
    
  }



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

              <th>{"Duration (Days)"}</th>
              <th>Start Day of Absence</th>
              <th>Description</th>
              <th>Type</th>
              <th>Document</th>
              <th>Employee ID</th>
              <th>Name</th>
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

                <td>{leaveType(leave.type)}</td>
                <td>{leaveDocument(leave.document)}</td>
                <td>{leave.employee_id}</td>
                <td>{leave.firstname + " " + leave.lastname}</td>

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
