import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import Stats from './components/stats';
import { Space, Row, Col, Layout, Typography } from 'antd';
import Chart from './components/Chart';
import moment from 'moment'
import localization from 'moment/locale/fr';
import AllCountries from './components/AllCountries';
import DateChoice from './components/DatePicker';
moment.updateLocale('fr', localization);

const App = () => {
  const [chartData, setChartData] = useState([]);
  const [confirmed, setConfirmed] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();
  const [country, setCountry] = useState("france");
  const [countries, setCountries] = useState([])
  const [displayChart, setDisplayChart] = useState(false)
  const [displayDailyStats, setDisplayDailyStats] = useState(false)
  const [dailyStat, setDailyStat] = useState([]);
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
    setChartData([])
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
      setDisplayChart(false)
      setChartData([])
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
          let array=[]
          for (let i = 10; i < response.length; i++) {
            let day = response[i]
            let data = {}
            data["date"]=(moment(day.Date).format('l'))
            data["confirmés"] = day.Confirmed
            data["Morts"]=day.Deaths
            data["guéris"]=day.Recovered
            array.push(data)
            i++
        }
        setChartData(array)
        setDisplayChart(true)
      })
      .catch((error) => console.error(error));
    }
  }

  const fetchDay = () =>{
    let dayBefore = moment(date).subtract(1, 'days').format("YYYY-MM-DD");
    const urlCountryDay = `https://api.covid19api.com/total/country/${country}?from=${dayBefore}&to=${date}T01:00:00Z`;
    console.log(urlCountryDay);
        fetch(urlCountryDay)
        .then((response) => response.json())
        .then((response) => {
          let day = response
          if(!day[0].Confirmed){
            setDisplayDailyStats(false)
          }else{
            setDisplayDailyStats(true)
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
        <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>
            <Row justify="space-around" align="middle" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col  className="gutter-row" span={4}>
                    <div className="pace-align-container space-align-block">
                      <Title level={3}>Depuis le début</Title>
                      <Stats confirmed={confirmed} deaths={deaths} recovered={recovered} />
                    </div>
                </Col>
                <Col  className="gutter-row" span={16}>
                  <AllCountries countryChoice={countryChoice} data={countries} />
                  {displayChart && <Chart data={chartData} />}
                </Col>
                <Col  className="gutter-row" span={4}>
                  <Title level={3}>Ce jour-là</Title>
                  <DateChoice dayChoice={dayChoice} />
                  {displayDailyStats && <Stats confirmed={dailyConfirmed} deaths={dailyDeaths} recovered={dailyRecovered} />}
                </Col>
            </Row>    
          </Content>
          <Footer>Réalisé par Nathan Chateau</Footer>
        </Layout>

    </div>
  );
}

export default App;
