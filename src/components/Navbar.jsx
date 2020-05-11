import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from "react-router-dom";


const Navbar = () => {
    
    return(
        <div className="mx-auto" style={{maxWidth:"1800px"}}>
            <nav style={{ backgroundColor: "#F0F2F5"}} class="navbar navbar-expand-lg navbar-light ">
                <Link className="navbar-brand" to="/">Stats Covid 19</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link className="nav-link" to="/">Accueil</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/informations">Informations</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/apropos">A propos</Link>
                        </li>
                    </ul>
                </div>
            </nav> 
        </div>
    );
};

export default Navbar