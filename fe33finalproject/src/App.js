import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Navbar from "./Components/navbar.js";
import Pagenotfound from "./pages/page-not-found.js";
import {routeHome} from "./routes";
const showMenuHome =routes=>{
  if(routes&& routes.length >0){
    return routes.map((item, index)=>{
      //Duyệt mảng
      return <Route key={index} {...item}/>
    })
  }
}
function App() {
  return (
    
    <BrowserRouter>
    <div> 
    <Navbar />
    <Switch>
    {showMenuHome(routeHome)}
      {/* Trang chủ
      <Route path="/" exact component={Home} />
      {/* Trang About */}
      {/* <Route path="/about"  component={About}/> */}
      {/* Trang list Movie */}
      {/* <Route path="/list-movie" component={ListMovie}/>  */} */


      {/* Phải luôn để page not found cuối cùng */}
      <Route path ="" component={Pagenotfound}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
