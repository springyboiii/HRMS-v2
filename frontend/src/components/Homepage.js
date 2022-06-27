import React, { useState, useRef } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import Login from '../pages/Login';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { set, useForm } from "react-hook-form";
import Axios from 'axios';
import { useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { UserTypeContext } from '../contexts/UserTypeContext';
import { Toast } from 'primereact/toast';
import { useContext } from 'react';


const Homepage = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { username, setUsername } = useContext(UserContext);
    const { UserType, setUserType } = useContext(UserTypeContext);
    const toast = useRef(null);

    let navigate = useNavigate();
    const [IsAuthenticated, setIsAuthenticated] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    Axios.defaults.withCredentials = true;


    useEffect(() => {
        return () => {
            Axios.get("http://localhost:3001/api/login").then((response) => {
                // console.log(response);
                if (response.data.loggedIn = true) {
                    // setIsAuthenticated(response.data.user[0])

                    console.log(response.data.user, response.data.payGrade, response.data.jobTitle, response.data.supervisor);
                    setUsername(response.data.user);
                    setUserType([{

                        payGrade: response.data.payGrade,
                        jobTitle: response.data.jobTitle,
                        supervisor: response.data.supervisor,
                    }]);

                    localStorage.setItem('username', JSON.stringify(response.data.user));
                    localStorage.setItem('payGrade', JSON.stringify(response.data.payGrade));
                    localStorage.setItem('title', JSON.stringify(response.data.jobTitle));
                    localStorage.setItem('supervisor', JSON.stringify(response.data.supervisor));

                }

            })
        };
    }, [])
    const onSubmit = (data) => {
        Axios.post("http://localhost:3001/api/login", {

            credentials: data

        }).then((response) => {
            console.log(response.data)
            if (response.data.message) {
                setIsAuthenticated(false);
                // alert(response.data.message)
                toast.current.show({ severity: 'error', summary: 'Authentication Error', detail: response.data.message, life: 5000 });
            } else {
                // this.props.setUsername(this.state.userName);
                setIsAuthenticated(true)
                // this.setState({isAuthenticated:true});

                // alert("logged in")
                toast.current.show({ severity: 'success', summary: 'Successfully Logged in!', life: 5000 });     //this doesn't show
                //redirect somehwere
                navigate('/dashboard', { replace: true });

            }
        })
    }

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
                <Container fluid>
                    <Nav className="mx-auto">
                        <Container fluid>
                            <Navbar.Brand >
                                <img
                                    src="/logo3.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                            </Navbar.Brand>
                            <Navbar.Brand>Employee Management System</Navbar.Brand>
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

            <Toast ref={toast} position="top-center"/>

            <Modal show={isLoginModalOpen} onHide={toggleLoginModal}>
                <ModalHeader >
                    <h4 style={{
                        textAlign: "center"
                    }}>Login</h4>
                </ModalHeader>
                <ModalBody>
                    {/* put login form in here */}
                    {/* <Login /> */}
                    <div>
                        <Form>
                            <div >
                                <Form.Group>
                                    Username
                                    <Form.Control type="text" placeholder='Username'
                                        {...register("username", {
                                            required: true
                                        })}
                                    />
                                </Form.Group>
                                {errors.username && <p className='errorMsg'>Username is required!</p>}

                                <Form.Group>
                                    Password
                                    <Form.Control type="password" placeholder='Password'
                                        {...register("password", {
                                            required: true
                                        })}
                                    />
                                </Form.Group>
                                {errors.password && <p className='errorMsg'>Password is required!</p>}

                                {/* <Form.Group>
              <input className="form-check-input" type="checkbox"
                {...register("remember")}
              />
              <Form.Label> Remember Me?</Form.Label>
            </Form.Group> */}
                            </div>


                            <div className='text-center'>
                                <Button onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                            {/* <br></br>
        <p className="forgot-password text-center">
          <a href="#"> Forgot password?</a>
        </p> */}
                        </Form>

                    </div>
                </ModalBody>
            </Modal>

            <Container>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/hrms1.png"
                            width="400"
                            height="600"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 style={{ color: 'black' }}>Employee Management System for Jupiter Apparel</h3>
                            <p style={{ color: 'black' }}>Manage employees' leave data without hassle</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="hrms2.png"
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
                            src="hrms3.png"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 style={{ color: 'black' }}>View your own leave details</h3>
                            <p style={{ color: 'black' }}>
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
