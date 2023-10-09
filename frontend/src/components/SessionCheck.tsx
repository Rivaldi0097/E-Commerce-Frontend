import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

function SessionCheck() {

    var cookies = new Cookies();

    if(!cookies.get('sessionId')){
        return <Navigate to="/login" replace />; 
        
    }else{
        try {


            const res = axios.get(`${process.env.REACT_APP_HOSTNAME}/api/users/`, {
                withCredentials: true,
                headers:{
                    'Authorization': cookies.get('sessionId')
                }
            })
    
    
            return <Outlet/>
            
        } catch (error) {
            console.log(error)

            return <Navigate to="/login" replace />; 
        }
    }

    
}

export default SessionCheck;