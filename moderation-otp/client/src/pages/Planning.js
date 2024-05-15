import React, { Link } from 'react';
import "../style/plannings.css";
import LogoLFL from "../assets/ligues/LFL.png"
import LogoLEC from "../assets/ligues/LEC.png"
import LogoLCK from "../assets/ligues/lck.png"



const Plannings = () => {

  return(
      <div className="leagues-container">
        
        <Link to=""><img src={LogoLFL}><h1>LFL</h1></img></Link>
        <Link to=""> <img src={LogoLEC}><h1>LEC</h1></img></Link>
        <Link to=""> <img src={LogoLCK}><h1>LCK</h1></img></Link>
      </div>
  )
}

export default Plannings; 














/*[
    { id: '1', resourceId: 'a', start: '2024-05-13T11:30:00', end: '2024-05-13T13:00:00', title: 'Tom', color:'red' },
    { id: '2', resourceId: 'a', start: '2024-05-13T11:00:00', end: '2024-05-13T15:00:00', title: 'Nokatir', color: "green" }, 
    { id: '3', resourceId: 'a', start: '2024-05-13T12:00:00', end: '2024-05-13T16:00:00', title: 'Prune', color: "blue" },
    { id: '4', resourceId: 'a', start: '2024-05-13T11:00:00', end: '2024-05-13T14:00:00', title: 'Jodeprout', color: "purple" },
    { id: '5', resourceId: 'a', start: '2024-05-13T12:30:00', end: '2024-05-13T17:00:00', title: 'sMOUMy', color: "#ff3f09"  }
  ]*/