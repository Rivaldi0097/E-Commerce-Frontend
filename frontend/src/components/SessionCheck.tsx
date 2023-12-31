import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loading from './Loading';


function SessionCheck() {

    var cookies = new Cookies();
    const [output, setOutput] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const check = async () => {

            try {

                const res = await axios.post(`${process.env.REACT_APP_HOSTNAME}/api/users/authentication`, {
                    sessionId: cookies.get('sessionId')
                })

                //set cookies for the userId
                // const convertedResult = JSON.parse(res.data.session)
                // cookies.set('userId', convertedResult.userId)
                
                setOutput(true)
                setLoading(false)

            } catch (error) {
                console.log("session check error: ", error)
                //since session is not valid anymore, we can remove the sessionId and userId from cookies
                cookies.remove('sessionId')
                cookies.remove('userId')
                cookies.remove('username')
                setOutput(false)
                setLoading(false)
            }
        }

        check()

    }, [])

    //check if there is no session Id, if not straight away lead user to login page
    if(!cookies.get('sessionId')){

        return <Navigate to="/login" replace />

    }else{

        //the loading is to wait for the useEffect above to finish
        return loading?
                <Loading/>
                :
                    //if session is valid, then it will proceed to the requested page,
                    //else, it will send user to login page
                    output?
                        <Outlet/>
                    :
                        <Navigate to="/login" replace />
    }
    
}

export default SessionCheck;