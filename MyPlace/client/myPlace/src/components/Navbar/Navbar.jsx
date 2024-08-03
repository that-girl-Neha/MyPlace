import { useState } from 'react';

import { useContext  } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
import './Navbar.scss';
import { useNotificationStore } from '../../library/notificationStore';
function Navbar(){
    const [open,setOpen]=useState(false);
    const {currentUser} =useContext(AuthContext);

    const fetch = useNotificationStore((state) => state.fetch);
    const number = useNotificationStore((state) => state.number);
  
    if(currentUser) fetch();
return (
    <>
        <nav>
            <div className="left">
                <Link to="/" className='link logo'>
                    <img src="/logo.png" alt=""/>
                    <span>MyPlace</span>
                    </Link>
                <Link to="/" className='link'>Home</Link>
                <Link to="/" className='link'>About</Link>
                <Link to="/" className='link'>Contacts</Link>
                <Link to="/" className='link'>Agents</Link>
            </div>
            <div className="right">
            {currentUser ? (<div className='user'>
                <img src={currentUser.avatar || "/noavatar.jpg"} alt=""/>
                <span>{currentUser.username}</span>
             
                <Link  className='link profile' to="/profile" >
                    {number>0 && <div className='notification'>{number}</div>}
                    <span>Profile</span>
                </Link>
               
            </div>):(
                <>
                <Link to="/login" className='link'>Sign in</Link>
                <Link to="/register" className='link register'>Sign up</Link>
                </>
                )}
                <div className="menuIcon" onClick={()=>setOpen(!open)}>
                    <img src="/menu.png" alt=""/>
                </div>
                <div className={open?"menu active":"menu"} >
                <Link to="/" className='link'>Home</Link>
                <Link to="/" className='link'>About</Link>
                <Link to="/" className='link'>Contacts</Link>
                <Link to="/" className='link'>Agents</Link>
                <Link to="/" className='link'>Sign in</Link>
                <Link to="/" className='link'>Sign up</Link>

                </div>
            </div>
        </nav>
    </>
);
}

export default Navbar;