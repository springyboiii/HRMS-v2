import React from 'react';
import { useState, setState, useContext, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Card, Button } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
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
  const toast = useRef(null);

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


  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };




  const handleSubmit = (event) => {
    const data = new FormData()
    var x = ""
    data.append('file', selectedFile)
    data.append("fileName", fileName);

    if (startDate === null || startDate==="") {
      // alert("please enter the start date")
      toast.current.show({ severity: 'info', summary: 'Incomplete Details', detail: 'please enter the start date.', life: 5000 });
    }

    else if (duration === null || duration ==="" ) {
      // alert("please enter the duration")
      toast.current.show({ severity: 'info', summary: 'Incomplete Details', detail: 'please enter the duration.', life: 5000 });
    }

    else if (type === null || type==="") {
      // alert("please select the type")
      toast.current.show({ severity: 'info', summary: 'Incomplete Details', detail: 'please select the leave type.', life: 5000 });
    }

    else if (duration > 100 ) {
      // alert("please enter the duration")
      toast.current.show({ severity: 'info', summary: 'Invalid Details', detail: 'Maximum amount of duration for leave can be 100 days.', life: 5000 });
    }


    else {
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
            // alert("Leave Application Submitted")
            toast.current.show({ severity: 'success', summary: 'Leave Application Submitted!', life: 5000 });  
          })
        })

        // console.log(empId)
      }).then(() => {
        // alert("Leave Application Submitted");
        toast.current.show({ severity: 'success', summary: 'Leave Application Submitted!', life: 5000 });  
      })

    }
    // console.log(name, nic, source, paysheet, income,year,tin);



    props.handleSubmit(startDate, duration, type, description, fileName, "Pending");
    // alert("Leave Application Submitted")

    // alert(`The name you entered was: ${startDate}`);
    
    

    event.preventDefault();
    setStartDate("");
    setDuration("");
    setType("");
    setDescription("");
    setFile("");
    setFileName("");
    setSelected("");
  }




  return (
    <div>

      <Header />
      <br></br>
      <h3 className='text-center'>Leave Application Form</h3>
      <div className='container'>
      <Toast ref={toast} position="top-center"/>
        <Card className='shadow'>
          <div className='row container'>
            <div className='col-md-6' style={{'display': 'flex', 'justify-content': 'center'}}>
              <Card.Img variant="bottom" src="leave1.png" fluid />
            </div>
            <div className='col-md-6'>
              <div >
                <Form>
                  <div >
                    <div class="row">
                      <div class="col-sm">
                        <Form.Group>
                          From
                          <Form.Control type="date" id='startDate' min={disablePastDate()} max="2022-12-31" name='startDate' value={startDate} onChange={(e) => handleInputChange(e)}

                          />
                        </Form.Group>
                      </div>
                      <div class="col-sm">
                        <Form.Group>
                          Duration (days)
                          <Form.Control type="number" min="1" max="100" id="duration" name='duration' value={duration} onChange={(e) => handleInputChange(e)}

                          />
                        </Form.Group>

                      </div>

                    </div>
                  </div>




                  <Form.Group>
                    Type of Leave Request
                    

                    <Form.Select aria-label="Default select example" required id='type' name='type' value={type} onChange={(e) => handleInputChange(e)}>
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

                    <textarea class="form-control" id="description" rows="3" name='description' value={description} onChange={(e) => handleInputChange(e)} placeholder='Brief description about the reason for your leave'></textarea>

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
              </div>          </div>
          </div>

        </Card>
      </div>

      <Footer />
    </div>
  );
}
export default LeaveApplication;