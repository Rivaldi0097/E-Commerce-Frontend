"Use client"

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import Logo from "../assets/logo-no-background.svg";

function ForgetPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("none");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const submit =  async () => {

        setDisable(true)

        try {
            
            const res = await axios.post(`${process.env.REACT_APP_HOSTNAME}/api/users/resetPasswordToken`, {
                email: email
            })
            setSuccess('success')
            setDisable(false)

        } catch (error: unknown) {

            if(axios.isAxiosError(error)){
                console.log(error)

                setErrorMessage(error.response?.data.error)
                setSuccess('fail')
                setDisable(false)
            }
        }

    }

    return (
        <div className="LoginContainer">

            <div className="LogoItem">
                <div className="LogoFlexbox">
                    
                    <img src={Logo} alt="loot__logo" className="Logo" />
                    
                </div>
            </div>

            <div className="FieldItem">
                <div className="FieldFlexbox">

                        <img src={Logo} alt="loot__logo" className="FieldLogo" />

                        <h1>Reset your password.</h1>

                        <label>Enter Email</label>
                        <input 
                            type="text" 
                            className="LoginTextField"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={disable}
                        />

                        <button 
                            className="LoginButton"
                            onClick={submit}
                            disabled={disable}
                        >
                            Submit
                        </button>

                        <div
                            style={{
                                display:'flex',
                                justifyContent:'center'
                            }}
                        >
                            {success === 'success'?
                                <p>Please check your email to reset your password</p>
                            :
                                success === 'fail'?
                                    <p style={{color:'red'}}>{errorMessage}</p>
                                :
                                    <></>
                            }
                        </div>

                </div>
            </div>

        </div>
    );
}

export default ForgetPassword;