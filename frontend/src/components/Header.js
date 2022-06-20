import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './Navbar.css';
import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';

const Header = () => {
    const [sidebar, setSidebar] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const toggleLogoutModal = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen);
    }

    const logout = () => {
        //implement
    }

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
                    <Container fluid>
                        <Nav.Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Nav.Link>
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
                        <Nav className="ms-auto">
                            <Nav.Link href="#" onClick={toggleLogoutModal}>
                                {/* <span className="fa fa-sign-in fa-lg"></span> Logout */}
                                Logout
                            </Nav.Link>
                        </Nav>

                        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                            <ul className='nav-menu-items' onClick={showSidebar}>
                                <li className='navbar-toggle'>
                                    <Link to='#' className='menu-bars'>
                                        <AiIcons.AiOutlineClose />
                                    </Link>
                                </li>
                                {SidebarData.map((item, index) => {
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </Container>
                </Navbar>
            ))}
            <Modal show={isLogoutModalOpen} onHide={toggleLogoutModal}>
                <ModalHeader >
                    <h4 style={{
                        textAlign: "center"
                    }}>Logout</h4>
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to Logout?
                    <br></br><br></br>
                    <Button className='btn-primary' onClick={logout}>Confirm</Button>
                    <Button className='btn-secondary' onClick={toggleLogoutModal}>Close</Button>
                </ModalBody>
            </Modal>
        </>
    );
}

export default Header;