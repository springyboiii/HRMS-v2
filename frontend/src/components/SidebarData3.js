import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from "react-icons/md";

export const SidebarData3 = [

    {
        title: 'Leave Details Configurations',
        path: '',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Leave Configure',
                path: '/LeaveConfigure',
                // icon: <MdIcons.MdPageview />,
                icon: <IoIcons.IoIosPaper />,
                cName: 'nav-text'
            },
            {
                title: 'Configure Pay Grade Leaves',
                path: '/paygradeleaves',
                icon: <MdIcons.MdPageview />,
                icon: <IoIcons.IoIosPaper />,
                cName: 'nav-text'
            },

        ]
    }


];