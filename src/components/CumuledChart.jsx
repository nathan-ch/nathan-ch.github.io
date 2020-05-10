import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const CumuledChart = ({data}) => {

    return (
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <LineChart width={200} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 3, right: 3 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dot={false} strokeWidth={3} dataKey="confirmés" stroke="#ef9115" />
            <Line type="monotone" dot={false} strokeWidth={3} dataKey="Morts" stroke="#cf1322" />
            <Line type="monotone" dot={false} strokeWidth={3} dataKey="guéris" stroke="#3f8600" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
};

export default CumuledChart