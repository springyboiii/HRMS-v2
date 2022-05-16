import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm} from "react-hook-form";

function Login() {

  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = (data) =>{
      console.log(data);
  }
  
  return (
    <div>

      <div style={{
        display: 'flex',
        margin: 'auto',
        width: 700,
        padding: 30
      }}>

        <br></br>
        <Form>
          <h4 style={{
            textAlign: "center",
            marginLeft: "200px",
            color: "green"
          }}>Login</h4>
          <br></br>
          <div >
              <div class="col-sm">
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder='Username...' 
                  {...register("username",{
                      required:true
                  })}
                  />
                </Form.Group>
                {errors.username && <p className='errorMsg'>Username is required!</p>}
              </div>
              <div class="col-sm">
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder='password' 
                  {...register("password",{
                      required:true
                  })}
                  />
                </Form.Group>
                {errors.password && <p className='errorMsg'>Password is required!</p>}
              </div>
              
              <div class="col-sm">
                
                <Form.Group>
                <input className="form-check-input" type="checkbox"
                {...register("remember")}
                />
                <Form.Label>Remember Me?</Form.Label>
                </Form.Group>  
            </div>          
          </div>


          <br></br>

          <Button onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
            Login
          </Button>
          <br></br> <br></br>
          <p className="forgot-password text-right">
              <a href="#"> Forgot password?</a>
         </p>
        </Form>
        
      </div>
    </div>
  );
}
export default Login;