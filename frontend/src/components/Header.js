import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SubMenu from './SubMenu';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import { SidebarData2 } from './SidebarData2';
import './Navbar.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useState,useEffect,useContext} from 'react';
import { UserTypeContext } from '../contexts/UserTypeContext';

import * as IoIcons from 'react-icons/io';

// const Header = () => {
//     const [sidebar, setSidebar] = useState(false);
    // const [level,setLevel]=useState(null);
    // const {userType,setUserType} = useContext(UserTypeContext);


// import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';
const Header = () => {
    let navigate = useNavigate();

    const [sidebar, setSidebar] = useState(false);

    const [level,setLevel]=useState(null);
    const {UserType,setUserType} = useContext(UserTypeContext);
    const {Username,setUsername} = useContext(UserContext);


    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);



    const showSidebar = () => setSidebar(!sidebar);
    // var level;


    // useEffect(() => {
    //     // level=localStorage.getItem('payGrade');
    //     setLevel(JSON.parse(localStorage.getItem('payGrade')));
    //     // console.log(level);

        
    //   }, []);
  
    // var level=localStorage.getItem('payGrade');

    console.log(UserType[0].payGrade);

    // console.log(userType);

    const toggleLogoutModal = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen);
    }

    const logout = () => {
        localStorage.setItem('username', JSON.stringify(""));
        localStorage.setItem('payGrade', JSON.stringify(""));
        localStorage.setItem('title', JSON.stringify(""));
        localStorage.setItem('supervisor', JSON.stringify(""));
        setUsername("");
        setUserType([{
            payGrade: null,
            jobTitle: null,
            supervisor: null,
            
          }]);
        Axios.get("http://localhost:3001/api/logout").then((response)=>{
        // console.log(response);
        if(response.data.message){
        
            alert(response.data.message)
            navigate('/', { replace: true });

        }
        
      })

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

                        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}  style={{ zIndex: '1'}}>
                            <ul className='nav-menu-items' >
                                <li className='navbar-toggle'>
                                    <Link to='#' className='menu-bars'>
                                        <AiIcons.AiOutlineClose onClick={showSidebar} />
                                    </Link>
                                </li>
                                {SidebarData.map((item, index) => {
                                    return <SubMenu item={item} key={index} />;
                                    // return (
                                    //     <li key={index} className={item.cName}>
                                    //         <Link to={item.path}>
                                    //             {item.icon}
                                    //             <span>{item.title}</span>
                                    //         </Link>
                                    //     </li>
                                    // );
                                })}
                                {/* {
                                    console.log(level)
                                }
                                 */}

                                {
                                    UserType[0].payGrade == 3 && <li className='nav-text'>

                                
                                        <Link to='/LeaveConfigure'>
                                        <IoIcons.IoIosPaper />
                                            <span>Leave Configure</span>
                                        </Link>
                                    </li>
                                }
                                {
                                    UserType[0].payGrade == 3 && <li className='nav-text'>

                                
                                        <Link to='/paygradeleaves'>
                                        <IoIcons.IoIosPaper />
                                            <span>Configure Pay Grade Leaves</span>
                                        </Link>
                                    </li>
                                }
                                {
                                    UserType[0].jobTitle == 1 && <li className='nav-text'>

                                
                                        <Link to='/addEmployee'>
                                        <IoIcons.IoIosPaper />
                                            <span>Add Employee</span>
                                        </Link>
                                    </li>
                                }
                                {
                                    UserType[0].jobTitle == 1 && <li className='nav-text'>

                                
                                        <Link to='/../components/editEmployee'>
                                        <IoIcons.IoIosPaper />
                                            <span>Edit Employee Details</span>
                                        </Link>
                                    </li>
                                }
                                {
                                    UserType[0].jobTitle == 2 && <li className='nav-text'>

                                
                                        <Link to='/addEmployee'>
                                        <IoIcons.IoIosPaper />
                                            <span>Add Employee</span>
                                        </Link>
                                    </li>
                                }
                                 {
                                    UserType[0].jobTitle == 3 && <li className='nav-text'>

                                
                                        <Link to='/../components/editEmployee'>
                                        <IoIcons.IoIosPaper />
                                            <span>Edit Employee Details</span>
                                        </Link>
                                    </li>
                                }
                                {
                                    UserType[0].jobTitle == 3 && SidebarData2.map((item, index) => {
                                        return <SubMenu item={item} key={index} />;
                                        // return (
                                        //     <li key={index} className={item.cName}>
                                        //         <Link to={item.path}>
                                        //             {item.icon}
                                        //             <span>{item.title}</span>
                                        //         </Link>
                                        //     </li>
                                        // );
                                    })
                                }
                                 {
                                    UserType[0].supervisor == 1 && <li className='nav-text'>

                                
                                        <Link to='/SupervisorApproveLeave'>
                                        <IoIcons.IoIosPaper />
                                            <span>Leave Requests</span>
                                        </Link>
                                    </li>
                                }
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


export default Header