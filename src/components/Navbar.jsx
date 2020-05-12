import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from "react-router-dom";
  import { FormattedMessage } from 'react-intl';



const NavBar = ({changeLanguage}) => {
    
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
                            <Link className="nav-link" to="/"><FormattedMessage id="home.navTitle" /></Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/informations"><FormattedMessage id="home.navInformation" /></Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/apropos"><FormattedMessage id="home.navAbout" /></Link>
                        </li>
                        <li class="nav-Item">
                            <a className="nav-link" onClick={changeLanguage}>lang  🇫🇷/🇬🇧 </a>
                        </li>
                    </ul>
                </div>
            </nav> 
        </div>
    );
};

export default NavBar