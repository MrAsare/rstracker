import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Latest from './Latest'
import {Route, Routes, useLocation} from "react-router-dom"
import Item from './Item'




const App = ()=> {


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);



    return (
      <>
      
      <Routes>
          <Route path="/latest" element={<Latest queryParams={queryParams}/>} />
          <Route path="/item" element={<Item queryParams={queryParams}/>} />
       </Routes>

      </>


    );
  
}

export default App