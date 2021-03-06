import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { set, useForm } from "react-hook-form";
import Axios from 'axios';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { UserTypeContext } from '../contexts/UserTypeContext';
// import { Toast } from 'primereact/toast';
 
import { useContext } from 'react';
function Login() {
  const {username,setUsername} = useContext(UserContext);
  const {UserType,setUserType} = useContext(UserTypeContext);
  // const toast = useRef(null);

  let navigate = useNavigate();
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  Axios.defaults.withCredentials=true;


  useEffect(() => {
    return () => {
      Axios.get("http://localhost:3001/api/login").then((response)=>{
        // console.log(response);
        if(response.data.loggedIn=true){
        // setIsAuthenticated(response.data.user[0])

        console.log(response.data.user,response.data.payGrade,response.data.jobTitle,response.data.supervisor);
        setUsername(response.data.user);
        setUserType([{

          payGrade: response.data.payGrade,
          jobTitle:response.data.jobTitle,
          supervisor: response.data.supervisor,
        }]);
       
        localStorage.setItem('username', JSON.stringify(response.data.user));
        localStorage.setItem('payGrade', JSON.stringify(response.data.payGrade));
        localStorage.setItem('title', JSON.stringify(response.data.jobTitle));
        localStorage.setItem('supervisor', JSON.stringify(response.data.supervisor));

        }
        
      })
    };
  }, [])
  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/api/login", {

      credentials: data

    }).then((response) => {
      console.log(response.data)
      if (response.data.message) {
        setIsAuthenticated(false);
        alert(response.data.message)
        // toast.current.show({severity: 'error', summary: 'Authentication Error', detail: response.data.message, life: 5000});
      } else {
        // this.props.setUsername(this.state.userName);
        setIsAuthenticated(true)
        // this.setState({isAuthenticated:true});

        alert("logged in")
        //redirect somehwere
        navigate('/dummy', { replace: true });


      }
    })
  }

  return (
    <div>
{/* <Toast ref={toast} /> */}
      <Form>
        <div >
            <Form.Group>
              Username
              <Form.Control type="text" placeholder='Username'
                {...register("username", {
                  required: true
                })}
              />
            </Form.Group>
            {errors.username && <p className='errorMsg'>Username is required!</p>}
          
            <Form.Group>
              Password
              <Form.Control type="password" placeholder='Password'
                {...register("password", {
                  required: true
                })}
              />
            </Form.Group>
            {errors.password && <p className='errorMsg'>Password is required!</p>}

            {/* <Form.Group>
              <input className="form-check-input" type="checkbox"
                {...register("remember")}
              />
              <Form.Label> Remember Me?</Form.Label>
            </Form.Group> */}
        </div>


        <div className='text-center'>
          <Button onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
            Login
          </Button>
        </div>
        {/* <br></br>
        <p className="forgot-password text-center">
          <a href="#"> Forgot password?</a>
        </p> */}
      </Form>

    </div>
  );
}
export default Login;