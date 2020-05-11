import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "antd/dist/antd.css";


const Country = () => {
  let { countrySlug } = useParams();
  const [country, setCountry] = useState(countrySlug);
  return (
    <div className="Country">
        <h1>CountryPage {country}</h1>
    </div>
  );
}

export default Country;
