import React from 'react'
import {Route} from "react-router-dom";
import Navbar from "../Components/navbar"
const HomeLayout =(props)=>{
    return (<div>
    <Navbar />
    {props.children}
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
