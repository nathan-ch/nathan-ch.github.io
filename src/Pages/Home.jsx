import React, { useState, useEffect, useParams } from 'react';
import "antd/dist/antd.css";
import Stats from '../components/stats';
import { Space, Row, Col, Layout, Typography, DatePicker, Spin } from 'antd';
import CumuledChart from '../components/CumuledChart';
import moment from 'moment'
import localization from 'moment/locale/fr';
import AllCountries from '../components/AllCountries';
import DateChoice from '../components/DateChoice';
import DailyChart from '../components/DailyChart';
import 'bootstrap/dist/css/bootstrap.css';
import {CaretDownOutlined} from '@ant-design/icons';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from "react-router-dom";
moment.updateLocale('fr', localization);

const Home = () => {
  const [cumuledChartData, setCumuledChartData] = useState([]);
  const [dailyChartData, setDailyChartData] = useState([]);
  const [confirmed, setConfirmed] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();
  const [country, setCountry] = useState("france");
  const [countries, setCountries] = useState([])
  const [date, setDate] = useState(moment().subtract(2, 'days').format("YYYY-MM-DD"))
  const [dailyConfirmed, setDailyConfirmed] = useState();
  const [dailyDeaths, setDailyDeaths] = useState();
  const [dailyRecovered, setDailyRecovered] = useState();
  const { Header, Footer, Sider, Content } = Layout;
  
  useEffect(() => {
    fetchStats()
    fetchDay()
  },[country]);

  useEffect(() => {
    fetchDay()
  },[date]);

  useEffect(() => {
    fetchCountries()
  },[]);

  const countryChoice = (value) => {
    setCountry(value)
  }

  const fetchCountries = () =>{
    setConfirmed("")
    setDeaths("")
    setRecovered("")
    setCumuledChartData([])
    const URL = `https://api.covid19api.com/countries`;
    fetch(URL)
    .then((response) => response.json())
    .then((response) => {
        let array=[]
        for (let i = 0; i < response.length; i++) {
        let country = response[i]
        let data = {}
        data["value"] = country.Slug
        data["text"] = country.Country
        array.push(data)
    }
    array.push({"value":"global","text":"1.Global"})
    if(array.length < 2){
      array.push({"value":"france","text":"France"})
    }
    setCountries(array)
    })
    .catch((error) => console.error(error));
  }

  const fetchStats = () =>{
    if(country === "global"){
      setCumuledChartData([])
      setDailyChartData([])
      setDailyConfirmed("")
      setDailyDeaths("")
      setDailyRecovered("")
      setConfirmed("")
      setDeaths("")
      setRecovered("")
      const urlGlobal = `https://api.covid19api.com/world/total`;
        fetch(urlGlobal)
        .then((response) => response.json())
        .then((response) => {
          setConfirmed(response.TotalConfirmed)
          setDeaths(response.TotalDeaths)
          setRecovered(response.TotalRecovered)
      })
      .catch((error) => console.error(error));
    }else{
        setDailyConfirmed("")
        setDailyDeaths("")
        setDailyRecovered("")
        setConfirmed("")
        setDeaths("")
        setRecovered("")
        const urlCountry = `https://api.covid19api.com/total/country/${country}`;
        fetch(urlCountry)
        .then((response) => response.json())
        .then((response) => {
          let lastDay = response[response.length-1]
          setConfirmed(lastDay.Confirmed)
          setDeaths(lastDay.Deaths)
          setRecovered(lastDay.Recovered)
          let cumuledArray=[]
          let dailyArray=[]
          for (let i = 40; i < response.length; i++) {
            let day = response[i]
            let dayBefore = response[i-1]
            // Data for cumuled chart
            let cumuledData = {}
            cumuledData["date"]=(moment(day.Date).format('l'))
            cumuledData["confirmés"] = day.Confirmed
            cumuledData["Morts"]=day.Deaths
            cumuledData["guéris"]=day.Recovered
            cumuledArray.push(cumuledData)

            // Data for daily chart
            let dailyData = {}
            dailyData["date"]=(moment(day.Date).format('l'))
            dailyData["confirmés"] = day.Confirmed - dayBefore.Confirmed
            dailyData["Morts"]=  day.Deaths - dayBefore.Deaths
            dailyData["guéris"]= day.Recovered - dayBefore.Recovered
            dailyArray.push(dailyData)
        }
        setCumuledChartData(cumuledArray)
        setDailyChartData(dailyArray)
      })
      .catch((error) => console.error(error));
    }
  }

  const fetchDay = () =>{
    setDailyConfirmed("")
    setDailyDeaths("")
    setDailyRecovered("")
    let dayBefore = moment(date).subtract(1, 'days').format("YYYY-MM-DD");
    const urlCountryDay = `https://api.covid19api.com/total/country/${country}?from=${dayBefore}&to=${date}T01:00:00Z`;
    console.log(urlCountryDay);
        fetch(urlCountryDay)
        .then((response) => response.json())
        .then((response) => {
          let day = response
          if(!day[0].Confirmed){
          }else{
            setDailyConfirmed(day[1].Confirmed - day[0].Confirmed)
            setDailyDeaths(day[1].Deaths - day[0].Deaths)
            setDailyRecovered(day[1].Recovered - day[0].Recovered)
          }
      })
      .catch((error) => console.error(error));
  }

  const dayChoice = (value) =>{
    if(value)setDate(moment(value._d).format("YYYY-MM-DD"))
  }

  return (
    <div className="text-center mx-auto" style={{maxWidth:"1800px"}}>
      {/* <div className="container-fluid">
        <div className="jumbotron" style={{backgroundColor:"#F0F2F5"}}> */}
            <h1 className="display-4 text-danger">Statistiques sur le Covid-19</h1>
            <hr className="my-4" style={{width:"500px"}}></hr>
              <div className="bg-dark pb-3 p-2 mx-auto rounded" style={{width:"20%"}}>
                <h3 className="text-light">Sélectionnez un pays</h3>
                  <AllCountries countryChoice={countryChoice} data={countries} />
              </div>
            <hr className="my-4" style={{width:"500px"}}></hr>
        {/* </div>
      </div> */}
      <div style={{backgroundColor:"#F0F2F5"}} className="container-fluid">
          <h4 className="text-center mb-4 text-secondary">Chiffres cumulés</h4>
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <Stats confirmed={confirmed} deaths={deaths} recovered={recovered} />
          </div>
          <div className="col-md-6">
            <CumuledChart data={cumuledChartData} />
          </div>
        </div>
        <h4 className="text-center text-secondary mb-4">Le {moment(date).format("dddd DD MMMM YYYY")}</h4>
        <DateChoice dayChoice={dayChoice} />
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <Stats confirmed={dailyConfirmed} deaths={dailyDeaths} recovered={dailyRecovered} />
          </div>
          <div className="col-md-6">
            <DailyChart data={dailyChartData} />
          </div>
        </div>

        </div>
      <Footer>Réalisé par <a href="mailto:nathanchateau@gmail.com">Nathan Chateau</a> </Footer>
      </div>            
  );
}

export default Home;
