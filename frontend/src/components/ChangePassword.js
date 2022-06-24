import React, { useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import './Modal.css';
import { Card } from 'react-bootstrap';
import { Toast } from 'primereact/toast';

const ChangePassword = () => {
  const { Username, setUsername } = useContext(UserContext);
  const toast = useRef(null);

  return (
    <div>
      <Header />
      <br></br>
      <Toast ref={toast} position="top-center" />
      <h3 className='text-center'>Change Password</h3>
      <div className='container'>
        <Card className='shadow'>
          <div className='row container'>
            <div className='col-md-6 container'>
              <Card.Img variant="bottom" src="password1.jpg" fluid />
            </div>
            <div className='col-md-6'>
              <div >
                <Formik
                  initialValues={{ email: "", password1: '', password2: '' }}
                  validate={values => {
                    const errors = {};
                    if (values.email != Username) {
                      errors.email = "Wrong username"
                    } else
                      if (!values.password1) {
                        errors.password1 = 'Required';
                      } else if (values.password1 != values.password2
                      ) {
                        errors.password2 = 'Passwords don\'t match';
                      }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      // alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                      Axios.post("http://localhost:3001/api/changePassword", {

                        email: values.email,
                        password: values.password2

                      }).then((response) => {
                        console.log(response.data)


                        // alert("Changed password")
                        toast.current.show({ severity: 'success', summary: 'Password Changed!', life: 5000 });




                      })
                    }, 400);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className='changePassword container'>
                      <br></br>

                      <label htmlFor="email" >Email Address</label>

                      <Field className="passwordField form-control" type="email" name="email" label="Username" />
                      <ErrorMessage className='error' name="email" component="div" />
                      <br></br>

                      <label htmlFor="email">Password</label>


                      <Field className="passwordField form-control" type="password" name="password1" />
                      <ErrorMessage className='error' name="password1" component="div" />
                      <br></br>

                      <label htmlFor="email">Re-enter Password</label>


                      <Field className="passwordField form-control" type="password" name="password2" />
                      <ErrorMessage className='error' name="password2" component="div" />
                      <br></br>

                      <button type="submit" className='submit-btn' disabled={isSubmitting}>
                        Submit
                      </button>
                      <br></br>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

        </Card>
      </div>
      <Footer />
    </div>
  )
}

export default ChangePassword