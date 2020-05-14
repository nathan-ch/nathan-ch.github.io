import React, {useState , useEffect} from 'react';
import {
    BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  } from 'recharts';
import { Radio } from 'antd';
  

const DailyChart = ({data}) =>{
    const[dataType, setDataType] = useState("Morts")
    const[color, setColor] = useState("#cf1322")

    useEffect(() => {
        if(dataType === "Morts"){
            setColor('#cf1322')
        }else if(dataType === 'confirmés'){
            setColor('#ef9115')
        }else{setColor('#3f8600')}
      },[dataType]);

    function dataChoice(e) {
        setDataType(e.target.value)
      }      

return (
    <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
            <BarChart
                width={500}
                height={300}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#FFFFFF" />
                <YAxis type="number" stroke="#FFFFFF" domain={[ dataMin => (0),'dataMax']}  /> />
                <Tooltip />
                <Legend verticalAlign="top" stroke="#FFFFFF" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="date" height={30} stroke="#8884d8" />
                <Bar dataKey={dataType} fill={color} />
            </BarChart>
        </ResponsiveContainer>
        <Radio.Group onChange={dataChoice} defaultValue="Morts">
            <Radio.Button className="red" value="Morts">Morts</Radio.Button>
            <Radio.Button className="yellow" value="confirmés">Cas confirmés</Radio.Button>
            <Radio.Button className="green" value="guéris">Cas guéris</Radio.Button>
        </Radio.Group>
    </div>
            );
}

export default DailyChart