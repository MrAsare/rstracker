import React from 'react';
import { LineChart, Line, XAxis,Label, YAxis, CartesianGrid, Tooltip, Legend  } from 'recharts';


const TimeSeries = (props) => {

    const newData = []
    const sliced = props.table.slice(-Math.min(props.table.length-1,360))
    sliced.forEach(elem=>{
        const date = new Date(Number(elem["timestamp"])*1000)
        newData.push({"timestamp": date.getHours()+":"+date.getMinutes().toString().padStart(2, '0'),"Buy":elem["avgHighPrice"],"Sell":elem["avgLowPrice"]})
    })



  return (
    <LineChart width={1200} height={600} data={newData}>
        <CartesianGrid strokeDasharray="3 3"  />
      <XAxis dataKey="timestamp" >
        <Label value="Time" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis domain={([dataMin, dataMax]) =>{return [Math.max(0,Math.floor(dataMin - (dataMax-dataMin)*0.1)), Math.ceil(dataMax + (dataMax-dataMin)*0.1)]}} />
      <Tooltip content={"YEET"}/>
      <Legend />
      <Line connectNulls type="monotone" dataKey="Buy" stroke="#fcba03" activeDot={{ r: 6, stroke:"#fca103"}} dot={{ stroke: '#fca103', strokeWidth: 1 }} strokeWidth={3} />
      <Line connectNulls type="monotone" dataKey="Sell" stroke="#0390fc" activeDot={{ r: 6, stroke:"#0390fc" }} dot={{ stroke: '#0390fc', strokeWidth: 1 }} strokeWidth={3} legendType='triangle'/>

    </LineChart>
  );
};

export default TimeSeries;