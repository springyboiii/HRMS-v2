import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import Login from '../pages/Login';


const Homepage = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
                <Container fluid>
                    <Nav className="mx-auto">
                        <Container fluid>
                            <Navbar.Brand href="#home">
                                <img
                                    src="/index.jpeg"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                            </Navbar.Brand>
                            <Navbar.Brand href="#">Employee Management System</Navbar.Brand>
                        </Container>
                    </Nav>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#" onClick={toggleLoginModal}>
                                <span className="fa fa-sign-in fa-lg"></span> Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={isLoginModalOpen} onHide={toggleLoginModal}>
                <ModalHeader >
                    <h4 style={{
                        textAlign: "center"
                    }}>Login</h4>
                </ModalHeader>
                <ModalBody>
                    {/* put login form in here */}
                    <Login />
                </ModalBody>
            </Modal>

            <Container>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/slide4.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Employee Management System for Jupyter Apparel</h3>
                            <p>Manage employees' leave data withuot hassle</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="slide3.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3 style={{ color: 'black' }}>Efficient Management</h3>
                            <p style={{ color: 'black' }}>Manage your employees data easily.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/slide1.jpeg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 style={{ color: 'white' }}>View your own leave details</h3>
                            <p>
                                Keep track of your leaves.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            <Footer />
        </div>
    )
}

export default Homepage
