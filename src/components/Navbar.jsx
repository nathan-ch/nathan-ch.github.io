import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
            <nav style={{ backgroundColor: "#F0F2F5"}} className="navbar navbar-expand-lg navbar-light ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <h6><Link className="nav-link" to="/"><FormattedMessage id="home.navTitle" /></Link></h6>
                        </li>
                        {/* <li className="nav-item">
                            <h6><Link className="nav-link" to="/informations"><FormattedMessage id="home.navInformation" /></Link></h6>
                        </li> */}
                        <li className="nav-item">
                            <h6><Link className="nav-link" to="/apropos"><FormattedMessage id="home.navAbout" /></Link></h6>
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