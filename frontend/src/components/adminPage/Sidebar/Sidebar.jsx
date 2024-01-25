
import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { PiStudentBold } from 'react-icons/pi';
import { FaSwatchbook } from 'react-icons/fa';
import { MdQrCode } from 'react-icons/md';
import { MdOutlineLogout } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { IoMdPersonAdd } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GiNotebook } from 'react-icons/gi';
import logo from '../../../assets/logo.png';
import './sidebar.css';
import { AddStudent } from '../ManageStudent/AddStudent.jsx';
import { EditStudent } from '../ManageStudent/EditStudent.jsx';
import { DeleteStudent } from '../ManageStudent/DeleteStudent.jsx';
import { Profile } from '../Profile/Profile.jsx';
import { Dashboard } from '../Dashboard/Dashboard.jsx';
import { MdDashboard } from "react-icons/md";
import { ModifyAttendance } from '../Attendance/ModifyAttendance.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Logout } from '../Authentication/Logout.jsx';


export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { itemType } = useParams(); 
  const location=useLocation()
  let path=location.pathname
  path=path?.slice(1,)
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(path || 'dashboard');

  const renderContent = (itemName) => {
    switch (itemName) {
      case 'dashboard':
        return <Dashboard />;
      case 'addstudent':
        return <AddStudent />;
      case 'editstudent':
        return <EditStudent />;
      case 'viewanddelete':
        return <DeleteStudent />;
   
      case 'viewandmodifyattendance':
        return <ModifyAttendance />;
      
      case 'profile':
        return <Profile />;
      case 'logout':
        return <Logout/>
      default:
        return <Dashboard />;
    }
  };
  const [content, setContent] = useState(renderContent(path)); 

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);

    navigate(`/${itemName.toLowerCase().replace(' ', '')}`);

    setContent(renderContent(itemName));
  };
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };
  
    handleResize();
  
    window.addEventListener('resize', handleResize);
    setActiveItem(path)
    setContent(renderContent(path || 'dashboard')); 
  
    return () => {
      window.removeEventListener('resize', handleResize);
    let token=localStorage.getItem('jwtToken')
    if(!token){
      navigate('/login')
    }
    };
  }, []);
  

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        width={200}
        collapsed={collapsed}
        style={{ height: '100vh', flex: 'none' }}
        className='rounded-end-4 sidebar-container'
      >
        <div className='d-flex flex-row justify-content-evenly mt-3' onClick={toggleSidebar}>
          {collapsed ? (
            <img src={logo} className='logo-style' alt='Logo' />
          ) : (
            <>
              <img src={logo} className='logo-style' alt='Logo' />
              <h4 className='fw-bold text-center d-inline mt-2'>E-attendance</h4>
            </>
          )}
        </div>
        <br />
        <div className=''>
          <Menu style={{ flexGrow: 1 }}>
            <MenuItem onClick={() => handleItemClick('dashboard')} icon={<MdDashboard />}>
              Dashboard
            </MenuItem>
            <SubMenu label='Manage Student' icon={<PiStudentBold size={25} />} defaultOpen className='menu-item'>
              <MenuItem onClick={() => handleItemClick('addstudent')} icon={<IoMdPersonAdd />}>
                Add Student
              </MenuItem>
              <MenuItem onClick={() => handleItemClick('editstudent')} icon={<FaEdit />}>
                Edit Student
              </MenuItem>
              <MenuItem onClick={() => handleItemClick('viewanddelete')} icon={<MdDelete />}>
                Delete Student
              </MenuItem>
            </SubMenu>
            <SubMenu label='Manage Attendance' icon={<FaSwatchbook size={25} />} defaultOpen>
              <MenuItem
                onClick={() => handleItemClick('viewandmodifyattendance')}
                style={{ color: 'black' }}
                icon={<GiNotebook />}
              >
                View and Modify
              </MenuItem>
            </SubMenu>
            
          </Menu>
          <Menu>
            <MenuItem onClick={() => handleItemClick('profile')} icon={<CgProfile size={25} />}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => {handleItemClick('logout')}} icon={<MdOutlineLogout size={25} />}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
      <div style={{ flex: '1', padding: '30px', height: '100vh' }}>{content}</div>
    </div>
  )
}
