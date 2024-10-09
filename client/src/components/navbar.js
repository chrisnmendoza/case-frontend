import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/" style={{"width" : "17%", "height": "17%"}}>
       <img src="/case.PNG" style={{"object-fit": "cover", "width": "100%", "height": "100%"}}></img>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>

       <div className="padded space" id="navbarPaddedSpace" style={{"width": "25%", "height": "25%"}}></div>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto" style={{"border-width": "2px", "border-style": "groove", "border-color": "black", "border-radius": "20px", "height": "15%", "width": "20%"}}>
           <li className="nav-item" style={{"height": "100%", "width": "100%"}}>
             <NavLink className="nav-link" to="/search" style={{"font-size": "150%", "text-align": "center"}}>
               Search Code
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}
