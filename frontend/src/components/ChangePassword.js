import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
const ChangePassword = () => {
    
  return (
    <div>
        <Header/>
        <h1>Wanna change your Password?</h1>
     <Formik
       initialValues={{email:"", password1: '', password2: '' }}
       validate={values => {
         const errors = {};
         
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
         <Form>
             <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password1" />
           <ErrorMessage name="password1" component="div" />
           <Field type="password" name="password2" />
           <ErrorMessage name="password2" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
        <Footer/>
    </div>
  )
}

export default ChangePassword