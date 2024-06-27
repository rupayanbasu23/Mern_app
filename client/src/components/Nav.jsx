// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import './Nav.css'

const Nav = () => {
  const showSidebar = ()=> {
    const sidebar = document.querySelector('.sidebar');
    
    sidebar.style.display = 'flex'
    
  }
  const hideSidebar = ()=> {
    const sidebar = document.querySelector('.sidebar');
   
    sidebar.style.display = 'none'

  }

  return (
    <nav>
      <ul className='sidebar'>
      <li onClick={hideSidebar} className='close'><IoCloseSharp  className='close-icon'/>
      </li>
      <li >
          <Link to="/" className='a' >Home</Link>
        </li>
        <li>
          <Link to="/task"  className='a'>Task</Link>
        </li>
      </ul>
      <ul>
        <li className='hideOnMobile' >
          <Link to="/" className='a' >Home</Link>
        </li>
        <li className='hideOnMobile'>
          <Link to="/task"  className='a'>Task</Link>
        </li>
        <li className='menu' onClick={showSidebar}><RxHamburgerMenu  className='menu-icon'/></li>
      </ul>
    </nav>
  );
};

export default Nav;
