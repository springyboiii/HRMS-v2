import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;
const DropdownLink1 = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [subsubnav, setsubSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const showsubSubnav = () => setsubSubnav(!subsubnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} >
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
              {/* <div>
                {item.subsubNav && subsubnav
                  ? item.iconOpened
                  : item.subsubNav
                    ? item.iconClosed
                    : null}
              </div> */}
              {/* {subsubnav &&
              // item.subNav.map((item, index) => {
              //   console.log(item);
              //   if (item.subsubNav!=[]){
                  item.subsubNav.map((item, index) => {
                    console.log(item);
                    return (
                      // item.subNav.map((item, index) => {
                    <div><DropdownLink1 to={item.path} key={index} >
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                  </DropdownLink1></div>
                      
                      //  ) }
                    );
                    })
      
              //   }
                
       
                
              // })
            } */}
              
            </DropdownLink>
           
          );
        })}

      {/* {subsubnav &&
        item.subNav.map((item, index) => {
          console.log(item);
          if (item.subsubNav!=[]){
            item.subsubNav.map((item, index) => {
              console.log(item);
              return (
                // item.subNav.map((item, index) => {
                <DropdownLink to={item.path} key={index} >
                  {item.icon}
                  <SidebarLabel>{item.title}</SidebarLabel>
                </DropdownLink>
                //  ) }
              );
              })

          }
          
 
          
        })} */}
    </>
  );
};

export default SubMenu;