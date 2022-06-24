import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Axios from 'axios';

const TotalLeave = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [count, setCount] = useState(0);

  const onSubmit = (data) => {

      Axios.get(`http://localhost:3001/api/leaveReport`,{
        params:{
          fromdate: data.from,
          todate: data.to,
          department_id: data.department_id
        }
      }).then((response) => {
        // alert("Voila user added")
        console.log(response.data.count)
        setCount(response.data.count);
        // if (response.data.message) {
        //   alert(response.data.message);
        //   return;
        // } 
      })
        ;


  }

  return (

    <div>
      <Header />
      <div className="signcontainer">
        <div className="row">
          <div className="col-sm">
            <Form.Group>
              <Form.Label>From:</Form.Label>
              <Form.Control type="date" name='from' {...register("from", {
                required: true,
                validate: value => new Date(value) <= new Date()
              })} 
              />
            </Form.Group>
            {errors.from && <p className='errorMsg'>Valid date is required!</p>}

          </div>
          <div className="col-sm">
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <Form.Control type="date" name='to' {...register("to", {
                required: true,
                validate: value => new Date(value) <= new Date()
              })} 
              />
            </Form.Group>
            {errors.to && <p className='errorMsg'>Valid date is required!</p>}

          </div>
          <div className="col-sm">
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <br></br>
                  <Form.Select name="department_id"  {...register("department_id",{validate: value => value !== 'default'})}>
                    <option value={"default"} >Choose an Option</option>
                    <option value="1">Department 1</option>
                    <option value="2">Department 2</option>
                    <option value="3">Department 3</option>
                  </Form.Select>
                </Form.Group>
                {errors.department_id && <p className='errorMsg'>Department details are required!</p>}
              </div>
              </div>
              <br></br>
             
              <div className='row'>
          <Button className="leave-report-btn" style={{width: "50%"}} onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
            Generate Report
          </Button>
          </div>
          {/* <h2>{count}</h2> */}
        </div>

        <div className='container'>

        
        {count}
      </div>
      

      <Footer />
    </div >
  )
}

export default TotalLeave