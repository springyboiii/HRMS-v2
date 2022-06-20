import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from "react-icons/md";

export const SidebarData2 = [
  
  {
    title: 'Generate Reports',
    path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Employee by Department',
        path: '/GenerateReport/EmployeebyDepartment',
        icon: <IoIcons.IoIosPaper />,
        // icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
      },
      {
        title: 'Total Leaves',
        path: '/GenerateReport/TotalLeavesgivenbyDepartment',
        icon: <IoIcons.IoIosPaper />,
        // icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Employee report',
        path:'/GenerateReport/Employeereportbygivencategory' ,
        icon: <IoIcons.IoIosPaper />,
        // icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
    ]
  }
  

];