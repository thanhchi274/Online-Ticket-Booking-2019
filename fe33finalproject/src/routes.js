import Home from "./pages/Home/home.js"
import About from "./pages/Home/about.js"
import ListMovie from "./pages/Home/list-movie.js"
import DetailMovie from "./pages/Home/detailMovie.js";
import OrderTicket from "./pages/Home/orderTicket.js";
const routeHome =[
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
        path:"/detail-movie/:id",
        exact: false,
        component: DetailMovie,
    },
    {
        path:"/order-ticket/:id",
        exact:false,
        component: OrderTicket,
    }

];
export {routeHome};