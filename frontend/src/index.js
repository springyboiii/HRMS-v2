import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from './reportWebVitals';
import { UserTypeContext } from './contexts/UserTypeContext';

const leaves = [{
  id: 1,
  duration: "5",
  description: "Meeting with Lion",
  start_date: "2022/05/13",
  type: '2',
  employee_id: 123,
  supervisor_id: 321,
},
{
  id: 2,
  duration: "5",
  description: "Meeting with Lion",
  start_date: "2022/05/13",
  type: '2',
  employee_id: 123,
  supervisor_id: 321,
},
{
  id: 3,
  duration: "5",
  description: "Meeting with Lion",
  start_date: "2022/05/13",
  type: '2',
  employee_id: 123,
  supervisor_id: 321,
},];

const employees = [{
  id: 1,

  
  firstName: "Nishaa",
  lastName: "Thalaivi",
  email: "gnishaa7@gmail.com",
  dob: "1999-12-07",
  isFemale: false,
  addressNo: "5",
  street: "Manning place",
  city: "Colombo",
  employeeId: 4,
  startDate: "2020-01-01",
  department: "2",
  payGrade: "1",
  jobTitle: "3",
  employmentStatus: "3",
  fullTime: true,
  supervisor: false,
  salary: 5000
}];


const root = ReactDOM.createRoot(document.getElementById('root'));
// const {userType,setUserType} = useState("Contextusertype");

// useEffect(() => {
//   // if(localStorage.getItem('username')) {
//   //   setUsername(JSON.parse(localStorage.getItem('username')));
//   // }
//   if(localStorage.getItem('payGrade')){
//     setUserType(JSON.parse(localStorage.getItem('payGrade')));
//   }
// }, []);


root.render(
  <React.StrictMode>
    {/* <UserTypeContext.Provider value={{ userType, setUserType }}> */}
    <App data={leaves} employees={employees} />
    {/* </UserTypeContext.Provider> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
