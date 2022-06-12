import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: 'Home',
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
    title: 'View Leave Details',
    path: '/viewLeave',
    icon: <MdIcons.MdPageview />,
    // icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Leave Configure',
    path: '/LeaveConfigure',
    // icon: <MdIcons.MdPageview />,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Log In',
    path: '/login',
    // icon: <MdIcons.MdPageview />,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }, 
  {
    title: 'Leave Requests',
    path: '/SupervisorApproveLeave',
    // icon: <MdIcons.MdPageview />,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Add Employee',
    path: '/addEmployee',
    // icon: <MdIcons.MdPageview />,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Edit Employee Details',
  //   path: '/EditEmployeeDetails',
  //   // icon: <MdIcons.MdPageview />,
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // }
  {
    title: 'Edit Employee Details',
    path: '/../components/editEmployee',
    // icon: <MdIcons.MdPageview />,
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }

];