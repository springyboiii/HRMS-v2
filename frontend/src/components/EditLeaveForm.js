import React from 'react';

import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";



import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import { TypeH1 } from 'react-bootstrap-icons';
import Axios from 'axios';



const Employee = ({ employee, register, errors, disabled, editEmployee }) => {

  // const {register, handleSubmit, formState:{errors}} = useForm();
  // console.log(employee)
  // console.log(employee);

  const handleChange = (value, field) => {
    // 1. Make a shallow copy of the items
    let items = [...this.employee];
    // 2. Make a shallow copy of the item you want to mutate
    let item = {
      ...items[field],
      field: value
    };
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[field] = item;
    // 5. Set the state to our new copy
    this.setEmployee({ items });

  };

  return (
    <div >

      {/* {<!editEmployee && Navbar />} */}

      <div>
        {/* {editEmployee &&  } */}
        

        <br></br>

        <div className="signcontainer">
          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstname" defaultValue={employee.firstname} {...register("firstname", {
                  required: !editEmployee
                })} disabled={editEmployee? 1 : disabled} onChange={(e) => { employee.firstname = e.target.value }}
                />
              </Form.Group>
              {errors.firstname && <p className='errorMsg'>First Name is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastname" defaultValue={employee.lastname} {...register("lastname", {
                  required: !editEmployee
                })} disabled={editEmployee? 1 : disabled} onChange={(e) => { employee.lastname = e.target.value }}
                />
              </Form.Group>
              {errors.lastname && <p className='errorMsg'>Last Name is required!</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" defaultValue={employee.email} {...register("email", {
                  required: !editEmployee,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })} disabled={disabled} onChange={(e) => { employee.email = e.target.value }}
                />
              </Form.Group>
              {errors.email && <p className='errorMsg'>Valid Email is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name='dob' defaultValue={employee.dob} {...register("dob", {
                  required: !editEmployee,
                  validate: editEmployee || (defaultValue => new Date(defaultValue) < new Date().setFullYear(new Date().getFullYear() - 18))
                })} disabled={editEmployee? 1 : disabled} onChange={(e) => { employee.dob = e.target.value }}
                />
              </Form.Group>
              {errors.dob && <p className='errorMsg'>Valid Date of Birth is required!</p>}
            </div>
          </div>


          <div className="col-sm">
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <br></br>
              <input type="radio" name="gender" defaultValue="0" disabled={editEmployee? 1 : disabled} defaultChecked={!employee.gender} {...register("gender", { required: !editEmployee })} onChange={(e) => { employee.gender = e.target.value }} /> Male
              <input type="radio" name="gender" defaultValue="1" disabled={editEmployee? 1 : disabled} defaultChecked={employee.gender} {...register("gender", { required: !editEmployee })} onChange={(e) => { employee.gender = e.target.value }} /> Female
            </Form.Group>
            {errors.gender && <p className='errorMsg'>Gender is required!</p>}
          </div>

          <br></br>

          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Address Number</Form.Label>
                <Form.Control type="text" name="addressNo" defaultValue={employee.addressNo} placeholder={employee.addressNo} {...register("addressNo", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.addressNo = e.target.value }}
                />
              </Form.Group>
              {errors.addressNo && <p className='errorMsg'>Address Number is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" name="street" defaultValue={employee.street} placeholder={employee.street} {...register("street", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.street = e.target.value }}
                />
              </Form.Group>
              {errors.street && <p className='errorMsg'>Street is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" defaultValue={employee.city} placeholder={employee.city} {...register("city", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.city = e.target.value }}
                />
              </Form.Group>
              {errors.city && <p className='errorMsg'>City is required!</p>}
            </div>
          </div>

        </div>



        <div className="signcontainer">
          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Joined Date</Form.Label>
                <Form.Control type="date" name='startDate' defaultValue={employee.startDate} placeholder={employee.startDate}
                  {...register("startDate", {
                    required: !editEmployee,
                    validate: editEmployee || (defaultValue => new Date(defaultValue) < new Date())
                  })} disabled={editEmployee? 1 : disabled} onChange={(e) => { employee.startDate = e.target.value }} />
              </Form.Group>
              {errors.startDate && <p className='errorMsg'>Valid Joined date is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" step="0.01" id="salary" name='salary' defaultValue={employee.salary} placeholder={employee.salary} {...register("salary", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.salary = e.target.value }} />
              </Form.Group>
              {errors.salary && <p className='errorMsg'>Salary is required!</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <br></br>
                <Form.Select name="department_id" value={employee.department_id} {...register("department_id", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })} disabled={disabled}>
                  <option value={"default"} disabled={disabled} onChange={(e) => { employee.department_id = e.target.value }}>Choose an Option</option>
                  <option value="1">Department 1</option>
                  <option value="2">Department 2</option>
                  <option value="3">Department 3</option>
                </Form.Select>
              </Form.Group>
              {errors.department_id && <p className='errorMsg'>Department details are required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Pay Grade</Form.Label>
                <br></br>
                <Form.Select name="payGrade" value={employee.payGrade} {...register("payGrade", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })} disabled={disabled}>
                  <option value={"default"} disabled={disabled} onChange={(e) => { employee.payGrade = e.target.value }}>Choose an Option</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                </Form.Select>
              </Form.Group>
              {errors.payGrade && <p className='errorMsg'>Pay Grade details are required!</p>}
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Job Title</Form.Label>
                <br></br>
                <Form.Select name="jobTitle" value={employee.jobTitle} {...register("jobTitle", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })} disabled={disabled}>
                  <option value={"default"} disabled={disabled} onChange={(e) => { employee.jobTitle = e.target.value }}>Choose an Option</option>
                  <option value="1">HR Manager</option>
                  <option value="2">Accountant</option>
                  <option value="3">Software Engineer</option>
                  <option value="4">QA Engineer</option>
                </Form.Select>
              </Form.Group>
              {errors.jobTitle && <p className='errorMsg'>Job title details are required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Employment Status Type</Form.Label>
                <br></br>
                <Form.Select name="employmentStatus" value={employee.employmentStatus} {...register("employmentStatus", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })} disabled={disabled}>
                  <option value={"default"} disabled={disabled} onChange={(e) => { employee.employmentStatus = e.target.value }}>Choose an Option</option>
                  <option value="1">Intern</option>
                  <option value="2">Contract</option>
                  <option value="3">Permanent</option>
                  <option value="3">Freelance</option>
                </Form.Select>
              </Form.Group>
              {errors.employmentStatus && <p className='errorMsg'>Employee Status type details are required!</p>}
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Part-time?</Form.Label>
                <br></br>
                <input type="radio" name="partTime" defaultValue="1" disabled={disabled} defaultChecked={employee.partTime} {...register("partTime", { required: !editEmployee })} onChange={(e) => { employee.partTime = e.target.value }} /> Yes
                <br></br>
                <input type="radio" name="partTime" defaultValue="0" disabled={disabled} defaultChecked={!employee.partTime} {...register("partTime", { required: !editEmployee })} onChange={(e) => { employee.partTime = e.target.value }} /> No
              </Form.Group>
              {errors.partTime && <p className='errorMsg'>Full time/Part time details are required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Supervisor?</Form.Label>
                <br></br>
                <input type="radio" name="supervisor" defaultValue="1" disabled={disabled} defaultChecked={employee.supervisor} {...register("supervisor", { required: !editEmployee })} onChange={(e) => { employee.supervisor = e.target.value }} /> Yes
                <br></br>
                <input type="radio" name="supervisor" defaultValue="0" disabled={disabled} defaultChecked={!employee.supervisor} {...register("supervisor", { required: !editEmployee })} onChange={(e) => { employee.supervisor = e.target.value }} /> No
              </Form.Group>
              {errors.supervisor && <p className='errorMsg'>Supervising details are required!</p>}
            </div>
          </div>
          <br></br>
        </div>



        <br></br>
      </div>

    </div>
  )
}

export default Employee