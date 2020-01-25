import React, { useState, useEffect } from 'react'
import Countdown from 'react-countdown';
import  { Redirect } from 'react-router-dom'
export default function CountDown() {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setRedirect(true); // Probably need to set redirect based on some condition
        }, 300000);
    }, []);
    if (redirect) return <Redirect to='/'  />
    const Completionist = () => <span>You are good to go!</span>;
    const rendered = ({minutes, seconds, completed }) => {
        if(completed){
          return <Completionist />
        }
        return <span>{minutes}:{seconds}</span>
    }
    return (
        <div className="countdown">
             <Countdown date={Date.now() + 300000} renderer={rendered}/>
        </div>
    )
}
