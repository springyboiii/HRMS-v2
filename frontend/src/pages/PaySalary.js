import React from 'react';
import { useState, useEffect, useContext } from "react";
import Table from 'react-bootstrap/Table';

import Axios from 'axios';

import Footer from '../components/Footer';

import Header from '../components/Header';
import { UserTypeContext } from '../contexts/UserTypeContext';
import { useNavigate } from "react-router-dom";





function PaySalary() {

  const [payreport, setPayReport] = useState([]);
  const { UserType, setUserType } = useContext(UserTypeContext);
  const navigate = useNavigate();









  useEffect(() => {
    if (UserType[0].jobTitle != 3){
      navigate('/dummy', { replace: true });
    }
    else{
      Axios.get(`http://localhost:3001/api/getpaysalary`).then((response) => {
      console.log(response.data)
      setPayReport(...payreport, response.data);

      // setLeave(response.data);
      // })

    });

    }
    

  }, [])

  function getGrade(type){
    switch (type){
      case '1':
        type="Level 1";
        break;
      case '2':
        type="Level 2";
        break;
      case '3':
        type="Level 3";
        break;

    }
    return type;
  }



  return (
    <div>
      <Header />
      <div className='container'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>

              <th>Pay Grade Level</th>
              <th>Total Salary</th>
            </tr>
          </thead>
          <tbody>

            {payreport.map((arr) =>
         

              <tr>

                <td>{getGrade(arr.payGrade)}</td>
                <td>{arr.total_salary}</td>



              </tr>

            )};



          </tbody>
        </Table>
      </div>
      <Footer />

    </div>
  )
}


export default PaySalary;