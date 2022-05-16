import React from 'react'
import Table from 'react-bootstrap/Table';
const Leave = ({leave}) => {
  return (
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Employee ID</th>
      <th>Start Day of Absence</th>
      <th>Duration</th>
      <th>Type of Leave</th>
      <th>Reason</th>
      <th>Document</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{leave.employee_id}</td>
      <th>{leave.start_date}</th>
      <td>{leave.duration}</td>
      <td>{leave.type}</td>
      <td>{leave.description}</td>
      <td>document</td>
      
    </tr>
   
  </tbody>
</Table>
    )
}

export default Leave