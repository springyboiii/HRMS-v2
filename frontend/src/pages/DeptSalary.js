import React from 'react';
import { useState, useEffect, useContext } from "react";
import Table from 'react-bootstrap/Table';

import Axios from 'axios';

import Footer from '../components/Footer';

import Header from '../components/Header';
import { UserTypeContext } from '../contexts/UserTypeContext';
import { useNavigate } from "react-router-dom";





function DeptSalary() {

  const [report, setReport] = useState([]);
  const { UserType, setUserType } = useContext(UserTypeContext);
  const navigate = useNavigate();









  useEffect(() => {
    if (UserType[0].jobTitle != 3){
      navigate('/dummy', { replace: true });
    }
    else{
      Axios.get(`http://localhost:3001/api/getdeptsalary`).then((response) => {
      console.log(response.data)
      setReport(...report, response.data);

      // setLeave(response.data);
      // })

    });
      
    }
    

  }, [])

  function getDept(type){
    switch (type){
      case 1:
        type="Department 1";
        break;
      case 2:
        type="Department 2";
        break;
      case 3:
        type="Department 3";
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

              <th>Department Name</th>
              <th>Total Salary</th>
            </tr>
          </thead>
          <tbody>

            {report.map((arr) =>
         

              <tr>

                <td>{getDept(arr.department_id)}</td>
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


export default DeptSalary;