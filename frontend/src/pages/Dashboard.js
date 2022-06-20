import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../components/Navbar.css';

const Dashboard = () => {
    const goToPersonal = () => {
//redirect to personal info page
    }


    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
                    <Container fluid>
                       
                        <Nav className="mx-auto">
                            <Container fluid>
                                <Navbar.Brand href="#home">
                                    <img
                                        src="/logo3.png"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"
                                        alt="React Bootstrap logo"
                                    />
                                </Navbar.Brand>
                                <Navbar.Brand href="#">Employee Management System</Navbar.Brand>
                            </Container>
                        </Nav>
                    </Container>
                </Navbar>
            ))}

            <div className='text-center'><h1>Dashboard</h1></div>
            <div className='row container'>
                <div className='col-md-3 container'>
                    <Card style={{ width: '18rem' }}>
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

                <div className='col-md-3 container'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="slide2.jpeg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                
                <div className='col-md-3 container'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="slide3.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-md-3 container'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="slide4.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard