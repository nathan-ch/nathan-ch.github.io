import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import { FormattedMessage } from 'react-intl';
import { ReactComponent as Doctors  } from '../images/doctors.svg';



const Apropos = () => {
 
  return (
    <div className="container">
        <h2 className="text-center text-secondary"><FormattedMessage id="about.title" /></h2>
        <p><FormattedMessage id="about.why" /></p>
        <p><FormattedMessage id="about.participate" /></p>
        <p>
          <a href="mailto:nathanchateau@gmail.com"><FormattedMessage id="about.contact" /></a>
        </p> 
        <p>
        <a href="https://github.com/nathan-ch/Covid19-Stats"><FormattedMessage id="about.repo" /></a>
        </p>
        <Doctors className="mt-4 mx-auto" width="75%" height="auto" />
    </div>
  );
}

export default Apropos;
