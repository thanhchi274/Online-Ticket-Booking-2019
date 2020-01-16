import Home from "./pages/Home/home.js";
import About from "./pages/Home/about.js";
import ListMovie from "./pages/Home/list-movie.js";
import DetailMovie from "./pages/Home/detailMovie.js";
import TheaterMovie from "./pages/Home/theater.js";
import Dashboard from "./pages/Admin/dashboard.js";
import Login from "./pages/Home/login";
import Signup from "./pages/Home/signup.js";
import Booking from "./pages/Home/booking";
import Info from "./pages/Home/info.js";
const routeHome = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    exact: false,
    component: About
  },
  {
    path: "/list-movie",
    exact: false,
    component: ListMovie
  },
  {
    path: "/detail-movie/:id",
    exact: false,
    component: DetailMovie
  },
  {
    path: "/theater-movie",
    exact: false,
    component: TheaterMovie
  },
  {
    path: "/login",
    exact: false,
    component: Login
  },
  {
    path: "/sign-up",
    exact: false,
    component: Signup
  },
  {
    path: "/dat-ve/:id",
    exact: false,
    component: Booking
  },
  {
    path: "/info",
    exact: false,
    component: Info
  }
];
const routeAdmin = [
  {
    path: "/dashboard",
    exact: false,
    component: Dashboard
  }
];
export { routeHome, routeAdmin };
