import axios from "axios";
import {useEffect, useState} from 'react'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';


const nameMap = {high: "Price High",  low : "Price Low",highTime: "High Time", lowTime:"Low Time", margin : "Margin", tax :"Tax", taxedMargin: "Taxed Margin", name:"Name",image : "Image"}



const  Latest = (props)=> {

    const [latestInfo,setLatestInfo] = useState({});
    // const [pageNum,setPageNum] = useState(1);
    // const [pageSize,setPageSize] = useState(10);
    // const [mappingInfo,setMappingInfo] = useState({})



useEffect(() =>{

    async function getLatestPrices(){
        const latestInfoResponse =  await axios.get(`http://localhost:5000/latest?${"size=" +props.queryParams.get("size")}`)
        setLatestInfo(latestInfoResponse.data)
    }

    getLatestPrices();
  },[props.queryParams])


//  useEffect(()=>{

//      async function getMappings(){
//          const mappingResponse =  await axios.get(`http://localhost:5000/mapping`)
//          setMappingInfo(mappingResponse.data)
//      }

//      getMappings();

//  },[])





      return (  <div className="outside">
                    <div className="nav">
                        
                    </div>
                    <div className="priceTable">
                        <ItemTable table ={latestInfo}/>
                    </div>
                </div>);
}





function ItemTable(props){
  
    if(!Object.values(props.table)[0]){
        return <p>No data</p>
    }
    
    const tableTitles = ["image", "name", "high","low","margin","taxedMargin"]
    const entries = Object.keys(props.table)
  
    if (!props.table || !typeof props.table === 'object' ||! Array.isArray(tableTitles)) {
      console.error("Table data is invalid")
      return <p>Invalid table data</p>
    }

    return <div className = "table-container"><Table striped hover variant="dark" >
        <thead className="table-titles">
            <tr className = "bean" key="titles">
                {tableTitles.map((title,idx) => {
                    return <th key ={idx}><button href="#" className='link-info text-decoration-none titleLink'>{nameMap[title]}</button></th>
                })}
            </tr>
        </thead>
        <tbody>
            {entries.map((id, idx) => {
                return <tr key={idx}>
                    {tableTitles.map(title => {
                        return getTableData(props.table, id, title)
                    })}
                </tr>
            })}
        </tbody>
    </Table >
    </div>

      }
    

  function getTableData(data,key,title){
    if(title === "taxedMargin"||title === "margin"){
        const className = Number(data[key][title]) <= 0? "text-danger" : "text-success"
        const sign = Number(data[key][title]) <= 0? "" : "+"
        return <td key = {key + ":" + title} className={className} >{sign +data[key][title]}</td>
    }else if(title === "image"){
        return <td key = {key + ":" + title}><Image src={data[key][title]} alt={data[key]["name"]}></Image></td>
    }else if(title === "name"){
        return <td key = {key + ":" + title}><a href={"/item/?id="+key}>{data[key][title]}</a></td>
    }
        return <td key = {key + ":" + title}>{data[key][title]}</td>
    

}






export default Latest