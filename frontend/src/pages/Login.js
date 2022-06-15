import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { set, useForm } from "react-hook-form";
import Axios from 'axios';
import { useState } from 'react';
function Login() {
  let navigate = useNavigate();
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/api/login", {

      credentials: data

    }).then((response) => {
      console.log(response.data)
      if (response.data.message) {
        setIsAuthenticated(false);
        alert(response.data.message)
      } else {
        // this.props.setUsername(this.state.userName);
        setIsAuthenticated(true)
        // this.setState({isAuthenticated:true});

        alert("logged in")
        //redirect somehwere
        navigate('/Home', { replace: true });


      }
    })
  }

  return (
    <div>

      {/* <div style={{
        display: 'flex',
        margin: 'auto',
        width: 700,
        padding: 30
      }}> */}

      <Form>
        {/* <h4 style={{
            textAlign: "center",
            marginLeft: "200px",
            color: "green"
          }}>Login</h4> */}
        <div >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder='Username'
                {...register("username", {
                  required: true
                })}
              />
            </Form.Group>
            {errors.username && <p className='errorMsg'>Username is required!</p>}
          
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder='Password'
                {...register("password", {
                  required: true
                })}
              />
            </Form.Group>
            {errors.password && <p className='errorMsg'>Password is required!</p>}

            <Form.Group>
              <input className="form-check-input" type="checkbox"
                {...register("remember")}
              />
              <Form.Label> Remember Me?</Form.Label>
            </Form.Group>
        </div>


        <div className='text-center'>
          <Button onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
            Login
          </Button>
        </div>
        <br></br>
        <p className="forgot-password text-center">
          <a href="#"> Forgot password?</a>
        </p>
      </Form>

      {/* </div> */}
    </div>
  );
}
export default Login;