import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: 'Personal Details',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Leave Application',
    path: '/leaveApplication',
    icon: <MdIcons.MdPageview />,
    // icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Personal Leave Details',
    path: '/viewLeave',
    icon: <MdIcons.MdPageview />,
    // icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Generate Reports',
  //   path: '',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Employee by Department',
  //       path: '/GenerateReport/EmployeebyDepartment',
  //       icon: <IoIcons.IoIosPaper />,
  //       // icon: <IoIcons.IoIosPaper />,
  //       cName: 'nav-text',
  //     },
  //     {
  //       title: 'Total Leaves',
  //       path: '/GenerateReport/TotalLeavesgivenbyDepartment',
  //       icon: <IoIcons.IoIosPaper />,
  //       // icon: <IoIcons.IoIosPaper />,
  //       cName: 'nav-text'
  //     },
  //     {
  //       title: 'Employee report',
  //       path:'/GenerateReport/Employeereportbygivencategory' ,
  //       icon: <IoIcons.IoIosPaper />,
  //       // icon: <IoIcons.IoIosPaper />,
  //       cName: 'nav-text'
  //     },
  //   ]
  // },

  // {
  //   title: 'Leave Configure',
  //   path: '/LeaveConfigure',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Log In',
  //   path: '/login',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // }, 
  // {
  //   title: 'Leave Requests',
  //   path: '/SupervisorApproveLeave',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Add Employee',
  //   path: '/addEmployee',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Change Password',
    path: '/changePassword',
    // icon: <MdIcons.MdPageview />,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Configure Pay Grade Leaves',
  //   path: '/paygradeleaves',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Edit Employee Details',
  //   path: '/EditEmployeeDetails',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // }
  // {
  //   title: 'Edit Employee Details',
  //   path: '/../components/editEmployee',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  

];