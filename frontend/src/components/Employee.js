import React from 'react';

import Navbar from '../components/Navbar';


import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import { TypeH1 } from 'react-bootstrap-icons';



const Employee = ({ employee, register, errors, disabled, editEmployee }) => {

  // const {register, handleSubmit, formState:{errors}} = useForm();

  return (
    <div >

      {!editEmployee && <Navbar />}

      <div>
        {/* {editEmployee &&  } */}
        <h4 style={{
          textAlign: "center",
          marginLeft: "200px",
          color: "green"
        }} defaultValue={employee.firstName}>Personal Information</h4>

        <br></br>

        <div className="signcontainer">
          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstname" defaultValue={employee.firstname} placeholder={employee.firstname} {...register("firstName", {
                  required: true
                })} disabled={disabled} onChange={(e) => { employee.firstName = e.target.value }}
                />
              </Form.Group>
              {errors.firstName && <p className='errorMsg'>First Name is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastname" defaultValue={employee.lastname} placeholder={employee.lastname} {...register("lastName", {
                  required: true
                })} disabled={disabled} onChange={(e) => { employee.lastName = e.target.value }}
                />
              </Form.Group>
              {errors.lastName && <p className='errorMsg'>Last Name is required!</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" defaultValue={employee.email} placeholder={employee.email} {...register("email", {
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })} disabled={disabled} onChange={(e) => { employee.email = e.target.value }}
                />
              </Form.Group>
              {errors.email && <p className='errorMsg'>Valid Email is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name='dob' defaultValue={employee.dob} placeholder={employee.dob} {...register("dob", {
                  required: true,
                  validate: defaultValue => new Date(defaultValue) < new Date().setFullYear(new Date().getFullYear() - 18)
                })} disabled={disabled} onChange={(e) => { employee.dob = e.target.value }}
                />
              </Form.Group>
              {errors.dob && <p className='errorMsg'>Valid Date of Birth is required!</p>}
            </div>
          </div>


          <div className="col-sm">
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <br></br>
              <input type="radio" name="gender" defaultValue="0" disabled={disabled} defaultChecked={!employee.isFemale} {...register("gender", { required: true })} onChange={(e) => { employee.gender = e.target.value }} /> Male
              <input type="radio" name="gender" defaultValue="1" disabled={disabled} defaultChecked={employee.isFemale} {...register("gender", { required: true })} onChange={(e) => { employee.gender = e.target.value }} /> Female
            </Form.Group>
            {errors.gender && <p className='errorMsg'>Gender is required!</p>}
          </div>

          <br></br>

          <div className="row">
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Address Number</Form.Label>
                <Form.Control type="text" name="addressNo" defaultValue={employee.addressNo} placeholder={employee.addressNo} {...register("addressNo", { required: true })}
                  disabled={disabled} onChange={(e) => { employee.addressNo = e.target.value }}
                />
              </Form.Group>
              {errors.addressNo && <p className='errorMsg'>Address Number is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" name="street" defaultValue={employee.street} placeholder={employee.street} {...register("street", { required: true })}
                  disabled={disabled} onChange={(e) => { employee.street = e.target.value }}
                />
              </Form.Group>
              {errors.street && <p className='errorMsg'>Street is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" defaultValue={employee.city} placeholder={employee.city} {...register("city", { required: true })}
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
                    required: true,
                    validate: defaultValue => new Date(defaultValue) < new Date()
                  })} disabled={disabled} onChange={(e) => { employee.startDate = e.target.value }} />
              </Form.Group>
              {errors.startDate && <p className='errorMsg'>Valid Joined date is required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" step="0.01" id="salary" name='salary' defaultValue={employee.salary} placeholder={employee.salary} {...register("salary", { required: true })}
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
                <Form.Select name="department" defaultValue={employee.department} {...register("department", { validate: defaultValue => defaultValue !== 'default' })} disabled={disabled}>
                  <option value={"default"} disabled={disabled} onChange={(e) => { employee.department = e.target.value }}>Choose an Option</option>
                  <option value="1">Department 1</option>
                  <option value="2">Department 2</option>
                  <option value="3">Department 3</option>
                </Form.Select>
              </Form.Group>
              {errors.department && <p className='errorMsg'>Department details are required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Pay Grade</Form.Label>
                <br></br>
                <Form.Select name="payGrade" defaultValue={employee.payGrade} {...register("payGrade", { validate: defaultValue => defaultValue !== 'default' })} disabled={disabled}>
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
                <Form.Select name="jobTitle" defaultValue={employee.jobTitle} {...register("jobTitle", { validate: defaultValue => defaultValue !== 'default' })} disabled={disabled}>
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
                <Form.Select name="employmentStatus" defaultValue={employee.employmentStatus} {...register("employmentStatus", { validate: defaultValue => defaultValue !== 'default' })} disabled={disabled}>
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
                <input type="radio" name="partTime" defaultValue="1" disabled={disabled} defaultChecked={employee.partTime} {...register("partTime", { required: true })} onChange={(e) => { employee.partTime = e.target.value }} /> Yes
                <br></br>
                <input type="radio" name="partTime" defaultValue="0" disabled={disabled} defaultChecked={!employee.partTime} {...register("partTime", { required: true })} onChange={(e) => { employee.partTime = e.target.value }} /> No
              </Form.Group>
              {errors.partTime && <p className='errorMsg'>Full time/Part time details are required!</p>}
            </div>
            <div className="col-sm">
              <Form.Group>
                <Form.Label>Supervisor?</Form.Label>
                <br></br>
                <input type="radio" name="supervisor" defaultValue="1" disabled={disabled} defaultChecked={employee.supervisor} {...register("supervisor", { required: true })} onChange={(e) => { employee.supervisor = e.target.value }} /> Yes
                <br></br>
                <input type="radio" name="supervisor" defaultValue="0" disabled={disabled} defaultChecked={!employee.supervisor} {...register("supervisor", { required: true })} onChange={(e) => { employee.supervisor = e.target.value }} /> No
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