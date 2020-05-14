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



const NavBar = ({changeLanguage, currentLang}) => {
    
    return(
        <div className="container">
            <nav style={{ backgroundColor: "#F0F2F5"}} class="navbar-center navbar navbar-expand-lg navbar-light ">
            <h3><Link className="nav-link text-secondary" to="/">Stats Covid 19</Link></h3>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <h4><Link className="nav-link" to="/"><FormattedMessage id="home.navTitle" /></Link></h4>
                        </li>
                        <li class="nav-item">
                            <h4><Link className="nav-link" to="/informations"><FormattedMessage id="home.navInformation" /></Link></h4>
                        </li>
                        <li class="nav-item">
                            <h4><Link className="nav-link" to="/apropos"><FormattedMessage id="home.navAbout" /></Link></h4>
                        </li>
                        <li class="nav-Item">
                            <h4><a className="nav-link" onClick={changeLanguage}>{ currentLang === "en" ?  '🇫🇷' : '🇬🇧'}</a></h4>
                        </li>
                    </ul>
                </div>
            </nav> 
        </div>
    );
};

export default NavBar