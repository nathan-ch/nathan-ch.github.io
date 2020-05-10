import React from 'react';
import {
    BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  } from 'recharts';
  

const DailyChart = ({data}) =>{

return (
    <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
            <BarChart
                width={500}
                height={300}
                data={data}
                
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[ dataMin => (0),'dataMax']}  /> />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="date" height={30} stroke="#8884d8" />
                {/* <Bar dataKey="confirmés" fill="#ef9115" /> */}
                <Bar dataKey="Morts" fill="#cf1322" />
                {/* <Bar dataKey="guéris" fill="#3f8600" /> */}
            </BarChart>
        </ResponsiveContainer>
    </div>
            );
}

export default DailyChart