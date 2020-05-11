import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "antd/dist/antd.css";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Informations from './Pages/Informations';
import Apropos from './Pages/Apropos';
import Country from './Pages/Country';


const App = () => {
  return (
<Router>
    <div className="App">
      <Navbar />
    </div>
    <Switch>
      <Route path="/informations">
        <Informations />
      </Route>
      <Route path="/apropos">
        <Apropos />
      </Route>
      <Route path={`/country/:countrySlug`}>
        <Country />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
</Router> 
  );
}

export default App;
