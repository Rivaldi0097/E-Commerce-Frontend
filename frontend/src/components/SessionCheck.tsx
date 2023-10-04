import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function SessionCheck() {

    const [check, setCheck] = useState<boolean | null>(null);

    useEffect(() => {
        const session = async () => {
            try {

                console.log('hey')

                const res = await axios.get(`${process.env.REACT_APP_HOSTNAME}/api/users/`,{
                    withCredentials: true
                })
        
                console.log(res)
                // localStorage.setItem('userId', res.data._id);
        
                setCheck(true)
                
            } catch (error) {
                console.log(error)

                setCheck(false)
            }
        }

        session()
    }, [])


    return <Outlet/>; 

    
}

export default SessionCheck;