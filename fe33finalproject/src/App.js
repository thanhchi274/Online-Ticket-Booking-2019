import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pagenotfound from "./pages/page-not-found.js";
import HomeTemplate from "./Template/HomeTemplate";
import AdminTemplate from "./Template/AdminTemplate";
import Admin from "./pages/Home/Admin/admin.js";
import { routeHome, routeAdmin } from "./routes";
const showMenuHome = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      //Duyệt mảng
      return <HomeTemplate key={index} {...item} Component={item.component} />;
    });
  }
};
const showMenuAdmin = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return <AdminTemplate key={index} {...item} Component={item.component} />;
    });
  }
};
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {showMenuHome(routeHome)}
          {showMenuAdmin(routeAdmin)}
          {/* Trang chủ
      <Route path="/" exact component={Home} />
      {/* Trang About */}
          {/* <Route path="/about"  component={About}/> */}
          {/* Trang list Movie */}
          {/* <Route path="/list-movie" component={ListMovie}/>  */} */
          {/* Phải luôn để page not found cuối cùng */}
          <Route path="/admin" component={Admin} />
          <Route path="" component={Pagenotfound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
