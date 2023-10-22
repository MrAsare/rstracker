import axios from "axios";
import {useEffect, useState} from 'react'
import TimeSeries from "./TimeSeries";


const Item = (props)=>{

    const [itemInfo,setItemInfo] = useState([])

    useEffect(() =>{

        async function getItemInfo(){
            const received =  await axios.get(`https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${props.queryParams.get("id")}`)
            const latestInfoResponse = (await received).data["data"]
            setItemInfo(latestInfoResponse)
        }
    
        getItemInfo();
      },[props.queryParams])
    

return (
        <p>{<TimeSeries table={itemInfo} />}</p>
    )

}

export default Item