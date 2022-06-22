import React from 'react';
import { useState, setState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';



import Footer from '../components/Footer';
import Header from '../components/Header';



function LeaveApplication(props) {


  const [leave, setLeave] = useState({
    startDate: null,
    duration: null,
    type: null,
    description: null,
    file: null,
  });


  const [startDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelected] = useState(null);


  const { Username, setUsername } = useContext(UserContext);
  var empId;
  var supId;


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
      setSelected(e.target.files[0]);
      setFileName(e.target.files[0].name);
      console.log(e.target.files[0])


    }
    // const target = e.target;
    // var value = target.value;
    // const name = target.name;
    setLeave({ ...leave, [e.target.name]: e.target.value })



  }




  const handleSubmit = (event) => {
    const data = new FormData()
    var x = ""
    data.append('file', selectedFile)
    data.append("fileName", fileName);



    // console.log(name, nic, source, paysheet, income,year,tin);
    Axios.get(`http://localhost:3001/api/geteId/${Username}`).then((response) => {
      // console.log(response.data)
      empId = response.data.employee_id
      Axios.get(`http://localhost:3001/api/supeId/${empId}`).then((response) => {
        supId = response.data.supervisor_id
        Axios.post("http://localhost:3001/upload", data, {
          // receive two    parameter endpoint url ,form data
        }).then(
          res => { // then print response status
            x = res.data;
          }
        )

        Axios.post("http://localhost:3001/api/insert", {
          startDate: startDate,
          duration: duration,
          description: description,
          type: type,
          employee_id: empId,
          supervisor_id: supId,
          file: fileName,
          status: "Pending"
        }).then(() => {
          alert("Leave Application Submitted")
        })
      })

      // console.log(empId)
    })


    props.handleSubmit(startDate, duration, type, description, fileName, "Pending");
    alert("Leave Application Submitted")

    // alert(`The name you entered was: ${startDate}`);

    event.preventDefault();
  }




  return (
    <div>

      <Header />
      <div className='signcontainer'>
        <Form>
          <h4 className='text-center'>Leave Application Form</h4>
          <br></br>
          <div >
            <div class="row">
              <div class="col-sm">
                <Form.Group>
                  Start Day of Absence
                  <Form.Control type="date" required id='startDate' name='startDate' value={startDate} onChange={(e) => handleInputChange(e)}

                  />
                </Form.Group>
              </div>
              <div class="col-sm">
                <Form.Group>
                  Number of Days Requested
                  <Form.Control type="number" required min="1" max="100" id="duration" name='duration' value={duration} onChange={(e) => handleInputChange(e)}

                  />
                </Form.Group>

              </div>

            </div>
          </div>




          <Form.Group>
            Type of Leave Request

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
            Reason for Leave

            <textarea class="form-control" id="description" rows="3" name='description' value={description} onChange={(e) => handleInputChange(e)} placeholder='Brief description about why u need to take leave'></textarea>

          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            Upload Document (Optional)
            <Form.Control type="file" id="file" name='file' value={file} onChange={(e) => handleInputChange(e)} />
          </Form.Group>

          <div className='text-center'>
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Click here to submit form
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
export default LeaveApplication;