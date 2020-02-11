import Home from "./pages/Home/home.js";
import DetailMovie from "./pages/Home/detailMovie.js";
import Dashboard from "./pages/Admin/dashboard.js";
import Login from "./pages/Home/login";
import Signup from "./pages/Home/signup.js";
import Booking from "./pages/Home/booking";
import Info from "./pages/Home/info.js";
import InfoAdmin from "./pages/Admin/infoAdmin";
import UserManagement from "./pages/Admin/UserManagement";
import MovieManagement from "./pages/Admin/MovieManagement";
import UpAnhPhim from "./pages/Admin/UpAnh"
import TicketManageMent from "./pages/Admin/ticket-management.js";
const routeHome = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/detail-movie/:id",
    exact: false,
    component: DetailMovie
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
  },
  {
    path: "/infoAdmin",
    exact: false,
    component: InfoAdmin
  },
  {
    path: "/quan-ly-user",
    exact: false,
    component: UserManagement
  },
  {
    path: "/quan-ly-movie",
    exact: false,
    component: UpAnhPhim
  },
  {
    path: "/up-anh",
    exact: false,
    component: MovieManagement
  },
  {
    path: "/quan-ly-ve",
    exact: false,
    component: TicketManageMent
  }
];
export { routeHome, routeAdmin };
