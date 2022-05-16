import React from 'react'
import Employee from './Employee'
const Employees = ({ employees, id }) => {
  // const getEmployee=(id)=>{
  //   {employees.map((employee)=>employee.id === id)}
  // }
  return (
    <>
      {employees.map((employee) => employee.id === id && <Employee key = { employee.id } employee = { employee }  />
      )}
      {/* {employees.map((employee) => employee.id === id ? {...employee,description:"Changed"}:employee (<Employee employee={employee}/>))}</>   */}
    </>
  )
}




export default Employees