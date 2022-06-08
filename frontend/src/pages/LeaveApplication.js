import React from 'react';
import { useState, setState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar';
import Axios from 'axios';




import Footer from '../components/Footer';



function LeaveApplication(props) {


  const [leave,setLeave]=useState({
    startDate:null,
    duration:null,
    type:null,
    description:null,
    file:null,
    });


  const [startDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [type, setType] = useState(null);
  const [description,setDescription] = useState(null);
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {

    const { id, value } = e.target;
    if (id === "startDate") {
        setStartDate(value);
    }
    if (id === "duration") {
        setDuration(value);
    }
    if (id === "type") {
      
        setType(value);
    }
    if (id === "description") {
        setDescription(value);
    }
    if (id === "file") {
        setFile(value);
    }
    // const target = e.target;
    // var value = target.value;
    // const name = target.name;
    setLeave({ ...leave, [e.target.name]: e.target.value })

   

    }  
    



const handleSubmit= (event)=> {

  // props.handleSubmit(startDate,duration,type,description,file);
  // console.log(name, nic, source, paysheet, income,year,tin);
  Axios.post("http://localhost:3001/api/insert",{
    startDate:startDate,
    duration:duration,
  }).then(() => {
    alert('success');
  })

  alert(`The name you entered was: ${duration}`);

  // event.preventDefault();
}




  return (
    <div>

      <Navbar />
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
          }}>Leave Application Form</h4>
          <br></br>
          <div >
            <div class="row">
              <div class="col-sm">
                <Form.Group>
                  <Form.Label>Start Day of Abscence</Form.Label>

                  <Form.Control type="date" required id='startDate' name='startDate' value={startDate} onChange={(e) => handleInputChange(e)}

                  />
                </Form.Group>
              </div>
              <div class="col-sm">
                <Form.Group>
                  <Form.Label>Number of Days Requested</Form.Label>

                  <Form.Control type="number"required min="1" max="100" id="duration" name='duration' value={duration} onChange={(e) => handleInputChange(e)}

                  />
                </Form.Group>

              </div>

            </div>
          </div>




          <br></br>
          <Form.Group>
            <Form.Label>Type of Leave Request</Form.Label>

            <Form.Select aria-label="Default select example" id='type' name='type' value={type} onChange={(e) => handleInputChange(e)}>
              <option value={"default"} >Choose an Option</option>

              <option value="1">Annual Leave</option>
              <option value="2">Sick Leave</option>
              <option value="3">Maternity Leave</option>
              <option value="4">Parental Leave</option>
              <option value="5">Unpaid Leave</option>
              <option value="6">Other</option>
            </Form.Select>
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Reason for Leave</Form.Label>

            <textarea class="form-control" id="description" rows="3" name='description'  value={description} onChange={(e) => handleInputChange(e)} placeholder='Brief description about why u need to take leave'></textarea>

          </Form.Group>
          <br></br>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Document (Optional)</Form.Label>
            <Form.Control type="file" id="file" name='file'  value={file} onChange={(e) => handleInputChange(e)}/>
          </Form.Group>
          <br></br>


          <Button onClick={handleSubmit} variant="primary" type="submit">
            Click here to submit form
          </Button>
        </Form>
      </div>
      <Footer/>
    </div>
  );
}
export default LeaveApplication;