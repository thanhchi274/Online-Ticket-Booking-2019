import React from 'react'
import {Route} from "react-router-dom";
import Navbar from "../Components/navbar"
import Footer from "../Components/footer"
const HomeLayout =(props)=>{
    return (<div>
    <Navbar />
    {props.children}
    <Footer />
    </div>)
}
export default function HomeTemplate({Component,component,...props}) {
   return (<Route 
       {...props}
       render ={(propsComponent)=>(
           <HomeLayout>
            <Component {...propsComponent}  />
           </HomeLayout>
       )
       }
   />
   );
}
