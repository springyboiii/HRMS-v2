import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import './Modal.css';

const ChangePassword = () => {
    const {Username,setUsername} = useContext(UserContext);

  return (
    <div>
        <Header/>
        <br></br>         
        
        
        {/* <h1>{Username}</h1> */}
     <Formik
       initialValues={{email:"", password1: '', password2: '' }}
       validate={values => {
         const errors = {};
         if(values.email!=Username){
            errors.email="Wrong username"
         }else 
         if (!values.password1) {
           errors.password1 = 'Required';
         } else if (values.password1!=values.password2
         ) {
           errors.password2 = 'Passwords don\'t match';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
           Axios.post("http://localhost:3001/api/changePassword", {

      email: values.email,
      password:values.password2

    }).then((response) => {
      console.log(response.data)
      

        alert("Changed password")
       


      
    })
         }, 400);
       }}
     >
       {({ isSubmitting }) => (

         <Form className='changePassword'>
          <br></br>
          <h3 >Change Password</h3>
          <br></br>

            <label htmlFor="email" >Email Address</label>
            <br></br>

             <Field  className= "passwordField" type="email" name="email" label="Username"/>
           <ErrorMessage className='error' name="email" component="div" />
           <br></br>  <br></br>

           <label htmlFor="email">Password</label>
           <br></br>


           <Field className= "passwordField" type="password" name="password1" />
           <ErrorMessage className='error' name="password1" component="div"  />
             <br></br>            <br></br>

           <label htmlFor="email">Re-enter Password</label>
           <br></br>


           <Field  className= "passwordField" type="password" name="password2" />
           <ErrorMessage className='error' name="password2" component="div" />
           <br></br>            <br></br>

           <button type="submit" className='submit-btn' disabled={isSubmitting}>
             Submit
           </button>
           <br></br><br></br>
         </Form>
       )}
     </Formik>
        <Footer/>
    </div>
  )
}

export default ChangePassword