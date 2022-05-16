// import React from 'react'
import { useNavigate } from "react-router-dom";
import Leaves from "./Leaves";
import Navbar from "./Navbar";
import Footer from '../components/Footer';

const SupervisorApproveLeave = ({ leaves }) => {
  const navigate = useNavigate();
  return (
    <>
      
      <Navbar /> 
     <Leaves leaves={leaves}/>

      <button onClick={() => navigate(-1)}>Go Back</button>
      <Footer />
    </>
  );
};

export default SupervisorApproveLeave;
