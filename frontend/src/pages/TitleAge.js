import React from 'react';
import { useState, useEffect, useContext } from "react";
import Table from 'react-bootstrap/Table';

import Axios from 'axios';

import Footer from '../components/Footer';

import Header from '../components/Header';
import { UserTypeContext } from '../contexts/UserTypeContext';
import { useNavigate } from "react-router-dom";





function TitleAge() {

  const [report, setReport] = useState([]);
  const { UserType, setUserType } = useContext(UserTypeContext);
  const navigate = useNavigate();
  const title=JSON.parse(localStorage.getItem('title'));


  useEffect(() => {
    if (title!= 3){
      navigate('/dummy', { replace: true });
    }
    else{
      Axios.get(`http://localhost:3001/api/getjobage`).then((response) => {
      console.log(response.data)
      setReport(...report, response.data);

      // setLeave(response.data);
      // })

    });

    }
    

  }, [])

  function getJobTitle(type) {
    switch (type) {
      case "1":
        type = "HR Manager";
        break;
      case "2":
        type = "Admin";
        break;
      case "3":
        type = "Managerial Employee";
        break;
      case "4":
        type = "Software Engineer";
        break;
      default:
        type = "None";
        break;
    }
    return type;
  }



  return (
    <div>
      <Header />
      <div className='container'>
        <Table striped bordered hover variant="dark" style={{width:"60%", textAlign:"center", marginLeft: "200px"}}>
          <thead>
            <tr>

              <th>Job Title</th>
              <th>Average Age</th>
            </tr>
          </thead>
          <tbody>

          {report.map((arr, index) => (
              <tr data-index={index} key={index}>
                <td>{getJobTitle(arr.jobTitle)}</td>
                <td>{Math.round(arr.avgAge)+" years"}</td>

              </tr>
            ))};

            {/* {report.map((arr) =>


              <tr>

                <td>{getJobTitle(arr.jobTitle)}</td>
                {console.log(typeof(arr.jobTitle))}
                <td>{arr.avgAge}</td>



              </tr>

            )}; */}



          </tbody>
        </Table>
      </div>
      <Footer />

    </div>
  )
}


export default TitleAge;