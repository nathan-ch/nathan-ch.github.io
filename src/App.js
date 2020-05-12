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
import {IntlProvider} from 'react-intl'
import messagesFr from './translation/fr'
import messagesEn from './translation/en'

const messages = {
  fr: messagesFr,
  en: messagesEn,
}; // On créé un objet qui contient toutes nos traductions, avec un index par langue


const App = () => {
  const [language, setLanguage] = useState('fr');

  const changeLanguage = (e) =>{
    if(language === 'fr'){
      setLanguage('en')
    }else{setLanguage('fr')}
  }

  return (
    <Router>
    <IntlProvider locale={language} messages={messages[language]}>
    <div className="App">
      <Navbar changeLanguage={changeLanguage} />
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
  </IntlProvider>
</Router> 
  );
}

export default App;
