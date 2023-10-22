import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend  } from 'recharts';


const LineGraph = (props) => {
    const newData = []
    Object.entries(props.table["daily"]).forEach(([k,v])=>{
        const date = new Date(Number(k))
        newData.push({"time":date.getDate() + "-" + date.toLocaleString('default', { month: 'long' }) ,"price":v,"avg" : props.table["average"][k]})

    })




  return (
    <LineChart width={1200} height={600} data={newData}>
        <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time"  />
      <YAxis domain={['dataMin','dataMax']} />
      <CartesianGrid stroke="#ccc" />
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#fcba03" activeDot={{ r: 6, stroke:"#fca103"}} dot={{ stroke: '#fca103', strokeWidth: 1 }} strokeWidth={3} />
      <Line type="monotone" dataKey="avg" stroke="#0390fc" activeDot={{ r: 6, stroke:"#0390fc" }} dot={{ stroke: '#0390fc', strokeWidth: 1 }} strokeWidth={3} legendType='triangle'/>

    </LineChart>
  );
};

export default LineGraph;