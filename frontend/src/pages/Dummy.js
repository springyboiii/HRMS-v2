import React from 'react'
import { Card, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../components/Navbar.css';
import Header from '../components/Header';
import Carousel from 'react-bootstrap/Carousel';

const Dummy = () => {
  const goToPersonal = () => {
    //redirect to personal info page
  }

  return (

    <div>
      <Header />
      <div className='text-center'><h1>Dashboard</h1></div>

      <Container>
        <Carousel>
          <Carousel.Item>
            <div className='row container'>
              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide1.jpeg" />
                  <Card.Body>
                    <Card.Title>View Personal Information</Card.Title>
                    <Card.Text>
                      View your personal information at a glance.
                    </Card.Text>
                    <Button variant="primary" onClick={goToPersonal()}>Personal Info</Button>
                  </Card.Body>
                </Card>
              </div>

              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide2.jpeg" />
                  <Card.Body>
                    <Card.Title>Apply for Leave through this simple form</Card.Title>
                    <Card.Text>
                      Apply for a leave.
                    </Card.Text>
                    <Button variant="primary" >Leave Application</Button>
                  </Card.Body>
                </Card>
              </div>

              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide4.jpg" />
                  <Card.Body>
                    <Card.Title>View Leave Details</Card.Title>
                    <Card.Text>
                      Take a look at previous leaves you have taken.
                    </Card.Text>
                    <Button variant="primary" >View Leaves</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className='row container'>
              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide4.jpg" />
                  <Card.Body >
                    <Card.Title>Change your Password</Card.Title>
                    <Card.Text>
                      Change your password to a stronger private one.
                    </Card.Text>
                    <Button variant="primary">Change Password</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide4.jpg" />
                  <Card.Body >
                    <Card.Title>Configure Leaves</Card.Title>
                    <Card.Text>
                      Configure leave count of employess.
                    </Card.Text>
                    <Button variant="primary" disabled>Configure Leave</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide4.jpg" />
                  <Card.Body >
                    <Card.Title>Edit Employee Details</Card.Title>
                    <Card.Text>
                      Update changed details of employees.
                    </Card.Text>
                    <Button variant="primary" disabled>Edit Details</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className='row container'>
              <h3 className='text-center'>Generate and view Reports</h3>
              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide4.jpg" />
                  <Card.Body >
                    <Card.Title>Department Report</Card.Title>
                    <Card.Text>
                      View a list of employess filtered by department.
                    </Card.Text>
                    <Button variant="primary">Employees by Department</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide4.jpg" />
                  <Card.Body >
                    <Card.Title>Leave Report</Card.Title>
                    <Card.Text>
                      View the total leaves during a given time period filtered by department.
                    </Card.Text>
                    <Button variant="primary" disabled>View Total Leaves</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-4 container'>
                <Card style={{ width: '18rem' }} className='shadow'>
                  <Card.Img variant="top" src="slide4.jpg" />
                  <Card.Body >
                    <Card.Title>Employee Report</Card.Title>
                    <Card.Text>
                      View details of employess filtered by department, job title, or pay grade.
                    </Card.Text>
                    <Button variant="primary" disabled>View Employees</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>


      <Footer />
    </div>
  )
}

export default Dummy