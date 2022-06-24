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
      <Header/>

      <Container>
        <div className='row'>
          <div className='col-md-3 container'>
            <Card style={{ width: '18rem' }} className='shadow'>
              <Card.Img variant="top" src="info.jpg" />
              <Card.Body>
                <Card.Title>View Personal Information</Card.Title>
                <Card.Text>
                  View your personal information at a glance.
                </Card.Text>
                <div className='text-center'>
                <Button variant="primary" onClick={goToPersonal()}>Personal Info</Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className='col-md-3 container'>
            <Card style={{ width: '18rem' }} className='shadow'>
              <Card.Img variant="top" src="leave2.jpg" />
              <Card.Body>
                <Card.Title>Apply for Leave</Card.Title>
                <Card.Text>
                  Apply for a leave through this simple form.
                </Card.Text>
                <div className='text-center'>
                <Button variant="primary" >Leave Application</Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className='col-md-3 container'>
            <Card style={{ width: '18rem' }} className='shadow'>
              <Card.Img variant="top" src="leave3.png" />
              <Card.Body>
                <Card.Title>View Leave Details</Card.Title>
                <Card.Text>
                  Take a look at previous leaves you have taken.
                </Card.Text>
                <div className='text-center'>
                <Button variant="primary" >View Leaves</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-3 container'>
            <Card style={{ width: '18rem' }} className='shadow'>
              <Card.Img variant="top" src="pwd.jpg" />
              <Card.Body >
                <Card.Title>Change your Password</Card.Title>
                <Card.Text>
                  Change your password to a stronger private one.
                </Card.Text>
                <div className='text-center'>
                <Button variant="primary">Change Password</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        
      </Container>


      <Footer />
    </div>
  )
}

export default Dummy