import React from 'react';

import Navbar from '../components/Navbar';
import { useState, useEffect } from "react";



import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import { TypeH1 } from 'react-bootstrap-icons';
import Axios from 'axios';



const EditLeaveForm = ({ employee, register, errors, disabled, editEmployee }) => {

 

  return (
    <div >
          
            <div className="col-sm">
              <Form.Group>
                <Form.Label>No. of Leaves Left</Form.Label>
                <Form.Control type="number"  id="leavesleft" name='leavesLeft' defaultValue={employee.leaves_left} placeholder={employee.leaves_left} {...register("salary", { required: !editEmployee })}
                  disabled={disabled} onChange={(e) => { employee.Leaves_left = e.target.value }} />
              </Form.Group>
              {errors.Leaves_left && <p className='errorMsg'>Leaves count is required!</p>}
            </div>
          

    </div>
  )
}

export default EditLeaveForm