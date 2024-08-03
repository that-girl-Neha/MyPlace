import "./Layout.scss";
import Navbar from "../../Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import { Navigate, Outlet } from "react-router-dom";

export function Layout(){

    return (<>
        <div className="layout">
    <div className='navbar'>
    <Navbar/>
    </div>
  
     <div className='content'>
     <Outlet/>
     </div>

    </div>
    </>);
}

export function RequiredAuth(){

    const {currentUser} =useContext(AuthContext);

    // useEffect(()=>{
    //     if(!currentUser)
    //      <Navigate to="/login"/>
    // },[currentUser]);

     
    return !currentUser  ?( <Navigate to="/login"/>):
    (<div className="layout">
    <div className='navbar'>
    <Navbar/>
    </div>
  
     <div className='content'>
     <Outlet/>
     </div>

    </div>
    );
}

export default {Layout , RequiredAuth};