import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import Stats from './components/stats';
import { Space, Row, Col, Layout, Typography, DatePicker } from 'antd';
import CumuledChart from './components/CumuledChart';
import moment from 'moment'
import localization from 'moment/locale/fr';
import AllCountries from './components/AllCountries';
import DateChoice from './components/DatePicker';
import DailyChart from './components/DailyChart';
import './App.css';
moment.updateLocale('fr', localization);

const App = () => {
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
    setConfirmed("chargement...")
    setDeaths("chargement...")
    setRecovered("chargement...")
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
      setDailyConfirmed("Chargement...")
      setDailyDeaths("Chargement...")
      setDailyRecovered("Chargement...")
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
          for (let i = 10; i < response.length; i++) {
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
    setDailyConfirmed("Chargement...")
    setDailyDeaths("Chargement...")
    setDailyRecovered("Chargement...")
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

  const { Title } = Typography;

  return (
    <div className="App">
       <Layout>
         <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
           <Col> 
            <Title type="secondary" level={1}>Statistiques sur l'épidémie du Covid-19</Title>
            <AllCountries countryChoice={countryChoice} data={countries} />
           </Col>
         </Row>
        <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 5,
              minHeight: 280,
            }}>
            <Row type="flex" align="middle" align-items="center" justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={4}>
                    <div>
                      <Title type="secondary" level={4}>Depuis le début de la pandémie</Title>
                      <Stats confirmed={confirmed} deaths={deaths} recovered={recovered} />
                    </div>
                </Col>
                <Col  className="gutter-row" span={4}>
                  <Title type="secondary" level={4}>Ce jour-là</Title>
                  <DatePicker defaultValue={moment().subtract(2, 'days')} onChange={dayChoice} />
                  <Stats confirmed={dailyConfirmed} deaths={dailyDeaths} recovered={dailyRecovered} />
                </Col>
                <Col className="gutter-row" span={16}>
                  <Title type="secondary" level={4}>Courbe d'évolution cumulée </Title>
                  <CumuledChart data={cumuledChartData} />
                  <Title type="secondary" level={4}>Nombre de mort par jour </Title>
                  <DailyChart data={dailyChartData} />
                </Col>
            </Row>    
          </Content>
          <Footer>Réalisé par Nathan Chateau</Footer>
        </Layout>

    </div>
  );
}

export default App;
