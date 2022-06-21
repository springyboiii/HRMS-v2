import React from 'react';

import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";

import './Employee.css';

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import { TypeH1 } from 'react-bootstrap-icons';
import Axios from 'axios';



const Employee = ({ employee, register, errors, disabled, editEmployee }) => {

  // const {register, handleSubmit, formState:{errors}} = useForm();
  // console.log(employee)
  // console.log(employee);

  return (
    <div>

      {/* {<!editEmployee && Navbar />} */}
      {/* <div className="col-sm-2">
        <img src="/empform5.PNG" alt="Employee form logo" class="img-thumbnail"></img>
      </div> */}

      <div>
        {/* {editEmployee &&  } */}

        <div className="signcontainer">
          <Form.Group>
            <div className="row">
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstname" defaultValue={employee.firstname} {...register("firstname", {
                  required: !editEmployee
                })} disabled={editEmployee ? 1 : disabled} onChange={(e) => { employee.firstname = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.firstname && <p className='errorMsg'>First Name is required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastname" defaultValue={employee.lastname} {...register("lastname", {
                  required: !editEmployee
                })} disabled={editEmployee ? 1 : disabled} onChange={(e) => { employee.lastname = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.lastname && <p className='errorMsg'>Last Name is required!</p>}
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" defaultValue={employee.email} {...register("email", {
                  required: !editEmployee,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })} disabled={editEmployee ? 1 : disabled} onChange={(e) => { employee.email = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.email && <p className='errorMsg'>Valid Email is required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name='dob' defaultValue={employee.dob} {...register("dob", {
                  required: !editEmployee,
                  validate: editEmployee || (defaultValue => new Date(defaultValue) < new Date().setFullYear(new Date().getFullYear() - 18))
                })} disabled={editEmployee ? 1 : disabled} onChange={(e) => { employee.dob = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.dob && <p className='errorMsg'>Valid Date of Birth is required!</p>}
              </div>
            </div>


            <div className="col-sm">
              {/* <Form.Group> */}
              <Form.Label>Gender</Form.Label>
              <br></br>
              <input type="radio" name="gender" defaultValue="0" disabled={editEmployee ? 1 : disabled} defaultChecked={!employee.gender} {...register("gender", { required: !editEmployee })} onChange={(e) => { employee.gender = e.target.value }} /> Male
              <input type="radio" name="gender" defaultValue="1" disabled={editEmployee ? 1 : disabled} defaultChecked={employee.gender} {...register("gender", { required: !editEmployee })} onChange={(e) => { employee.gender = e.target.value }} /> Female
              {/* </Form.Group> */}
              {errors.gender && <p className='errorMsg'>Gender is required!</p>}
            </div>

            <br></br>

            <div className="row">
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Address Number</Form.Label>
                <Form.Control type="text" name="addressNo" defaultValue={employee.addressNo} {...register("addressNo", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.addressNo = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.addressNo && <p className='errorMsg'>Address Number is required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" name="street" defaultValue={employee.street} {...register("street", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.street = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.street && <p className='errorMsg'>Street is required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" defaultValue={employee.city} {...register("city", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.city = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.city && <p className='errorMsg'>City is required!</p>}
              </div>
            </div>
          </Form.Group>
        </div>



        <div className="signcontainer">
          <Form.Group>
            <div className="row">
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Joined Date</Form.Label>
                <Form.Control type="date" name='startDate' defaultValue={employee.startDate}
                  {...register("startDate", {
                    required: !editEmployee,
                    validate: editEmployee || (defaultValue => new Date(defaultValue) < new Date())
                  })} disabled={editEmployee ? 1 : disabled} onChange={(e) => { employee.startDate = e.target.value }} />
                {/* </Form.Group> */}
                {errors.startDate && <p className='errorMsg'>Valid Joined date is required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" step="0.01" id="salary" name='salary' defaultValue={employee.salary} {...register("salary", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.salary = e.target.value }} />
                {/* </Form.Group> */}
                {errors.salary && <p className='errorMsg'>Salary is required!</p>}
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Department</Form.Label>

                {/* <br></br>
                {console.log(employee.department_id===1? 1:0)}
                <input type="radio" name="department_id" value="1" disabled={disabled} defaultChecked={employee.department_id} {...register("department_id", { required: !editEmployee })} onClick={(e) => { employee.department_id = e.target.value }} /> Department 1          
                <input type="radio" name="department_id" value="2" disabled={disabled} defaultChecked={employee.department_id} {...register("department_id", { required: !editEmployee })} onClick={(e) => { employee.department_id = e.target.value }} /> Department 2
                <input type="radio" name="department_id" value="3" disabled={disabled} defaultChecked={employee.department_id === 3 ? 1 : 0} {...register("department_id", { required: !editEmployee })} onClick={(e) => { employee.department_id = e.target.value }} /> Department 3 */}


                <Form.Select name="department_id" value={employee.department_id} {...register("department_id", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })}
                  disabled={disabled} onChange={(e) => { employee.department_id = e.target.value }}>
                  <option value={"default"} disabled={disabled} >Choose an Option</option>
                  <option value="1">Department 1</option>
                  <option value="2">Department 2</option>
                  <option value="3">Department 3</option>
                </Form.Select>
                {/* </Form.Group> */}
                {errors.department_id && <p className='errorMsg'>Department details are required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Pay Grade</Form.Label>
                <br></br>
                <Form.Select name="payGrade" value={employee.payGrade} {...register("payGrade", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })}
                  disabled={disabled} onChange={(e) => { employee.payGrade = e.target.value }}>
                  <option value={"default"} disabled={disabled} >Choose an Option</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                </Form.Select>
                {/* </Form.Group> */}
                {errors.payGrade && <p className='errorMsg'>Pay Grade details are required!</p>}
              </div>
            </div>
            <br></br>
            {/* <Form.Group> */}

            <div className="row">
              <div className="col-sm">
                <Form.Label>Job Title</Form.Label>
                <br></br>
                <Form.Select name="jobTitle" value={employee.jobTitle} {...register("jobTitle", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })}
                  disabled={disabled} onChange={(e) => { employee.jobTitle = e.target.value }}>
                  <option value={"default"} disabled={disabled} >Choose an Option</option>
                  <option value="1">HR Manager</option>
                  <option value="2">Admin</option>
                  <option value="3">Managerial Employee</option>
                  <option value="4">Software Engineer</option>
                </Form.Select>
                {/* </Form.Group> */}
                {errors.jobTitle && <p className='errorMsg'>Job title details are required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}

                <Form.Label>Employment Status Type</Form.Label>
                <br></br>
                {console.log(employee.employmentStatus)}
                <Form.Select name="employmentStatus" value={employee.employmentStatus} {...register("employmentStatus", { validate: editEmployee || (defaultValue => defaultValue !== 'default') })}
                  disabled={disabled} onChange={(e) => { employee.employmentStatus = e.target.value }}>
                  <option value={"default"} disabled={disabled} >Choose an Option</option>
                  <option value="1">Intern</option>
                  <option value="2">Contract</option>
                  <option value="3">Permanent</option>
                  <option value="4">Freelance</option>
                </Form.Select>
                {/* </Form.Group> */}
                {errors.employmentStatus && <p className='errorMsg'>Employee Status type details are required!</p>}
              </div>
            </div>
            <br></br>
            <div className="row">
              {/* <Form.Group> */}
              <div className="col-sm-6">
                <Form.Label>Supervisor's ID</Form.Label>
                <Form.Control type="text" name="supervisor_id" defaultValue={employee.supervisor_id} {...register("supervisor_id", {
                  required: !editEmployee
                })} disabled={disabled} onChange={(e) => { employee.supervisor_id = e.target.value }}
                />
                {/* </Form.Group> */}
                {errors.supervisor_id && <p className='errorMsg'>Supervisor's ID is required!</p>}
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Part-time?</Form.Label>
                <br></br>
                <input type="radio" name="partTime" defaultValue="1" disabled={disabled} defaultChecked={employee.partTime} {...register("partTime", { required: !editEmployee })} onClick={(e) => { employee.partTime = e.target.value }} /> Yes
                <br></br>
                <input type="radio" name="partTime" defaultValue="0" disabled={disabled} defaultChecked={!employee.partTime} {...register("partTime", { required: !editEmployee })} onClick={(e) => { employee.partTime = e.target.value }} /> No
                {/* </Form.Group> */}
                {errors.partTime && <p className='errorMsg'>Full time/Part time details are required!</p>}
              </div>
              <div className="col-sm">
                {/* <Form.Group> */}
                <Form.Label>Supervisor?</Form.Label>
                <br></br>
                {console.log(employee.supervisor)}
                <input type="radio" name="supervisor" value="1" disabled={disabled} defaultChecked={employee.supervisor} {...register("supervisor", { required: !editEmployee })} onClick={(e) => { employee.supervisor = e.target.value }} /> Yes
                <br></br>
                <input type="radio" name="supervisor" value="0" disabled={disabled} defaultChecked={!employee.supervisor} {...register("supervisor", { required: !editEmployee })} onClick={(e) => { employee.supervisor = e.target.value }} /> No

                {errors.supervisor && <p className='errorMsg'>Supervising details are required!</p>}
              </div>
            </div>
            <br></br>
            {/* </Form.Group> */}
          </Form.Group>
        </div>



        <br></br>
      </div>
      {/* <div className="col-sm-2">
        <div class="footer-images">
          <img src="/empform6.PNG" alt="Employee form logo" class="img-thumbnail"></img>
          <br></br><br></br><br></br><br></br><br></br>
        </div>
      </div> */}
    </div>
  )
}

export default Employee