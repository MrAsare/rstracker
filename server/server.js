
 const app = require('express')()
 const axios = require('axios')
 const cors = require('cors')


 const PORT = 5000
 const API_ENDPOINT = "https://prices.runescape.wiki/api/v1/osrs"
 const API_IMAGE = "https://services.runescape.com/m=itemdb_rs/obj_sprite.gif?id="


  const LATEST = "/latest"
  const TIMESTEP = "/timeseries"
  const MAPPING  ="/mapping"


  const API_BULK = "https://chisel.weirdgloop.org/gazproj/gazbot/os_dump.json"

  const defaultPage = 1;
  const defaultPageSize = 10;

  app.use(cors());


 app.get(LATEST,async (req,res) =>{
   try {
      const fPack = {}
      const latestRetrieved = await axios.get(API_ENDPOINT + LATEST)
      const latestData = (await latestRetrieved).data["data"]
      const bulkRetrieved = await axios.get(API_BULK)
      const bulkData = (await bulkRetrieved).data



      const page = !isNaN(req.query.page) ? parseInt(req.query.page) : defaultPage;

      const pageSize = !isNaN(req.query.size) ? parseInt(req.query.size) : defaultPageSize;

      const startIndex = (page - 1) * pageSize;
      
      const endIndex = page * pageSize;

      const paginatedData = Object.keys(latestData).slice(startIndex, endIndex);

      const totalPages = Math.ceil(latestData.length / pageSize);

      paginatedData.forEach((key)=>{


        if(bulkData[key] === undefined){
          return
        }

        const itemData = latestData[key]

        const row = {}
        Object.keys(itemData).map((title)=>{
          row[title] = itemData[title]
        })

        fPack[key] = row
        fPack[key]["margin"] = Number(fPack[key]["high"]) - Number(fPack[key]["low"]);
        fPack[key]["taxedMargin"] = Number(fPack[key]["margin"]) - Math.floor(Number(fPack[key]["low"]) * 0.01);
        fPack[key]["name"] = bulkData[key]["name"]
        fPack[key]["image"] = API_IMAGE + key
      })
      res.json(fPack)
    } catch (error) {
      console.log(error.stack)
      res.status(500).json({ error: error.stack });
    }
 })

 app.get(TIMESTEP, async (req,res)=>{
  try{
    
  }catch(error){
    console.log(error.stack)
    res.json(error.stack)
  }
 })


 app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
 })

