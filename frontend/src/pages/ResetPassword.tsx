"Use client"

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios, {isAxiosError} from "axios";
import "../styles/login.css";
import Logo from "../assets/logo-no-background.svg";
import showPasswordEye from "../assets/showPassword.svg";
import hidePasswordEye from "../assets/hidePassword.svg";

function ResetPassword() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordInputType, setPasswordInputType] = useState<string>("password");
    const [disable, setDisable] = useState<boolean>(false);

    const [newPassword, setNewPassword] = useState<string>('');
    const [cfmPassword, setCfmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [success, setSuccess] = useState<string>("none");

    const submit = async () => {

        setSuccess('none')
        setDisable(true)

        if(newPassword === cfmPassword){
            //get userid and token from link
            const link = window.location.href;
            const splitLink = link.split("?")[1].split('&');

            const uid = splitLink[0].split('=')[1];
            const token = splitLink[1].split('=')[1];

            //submit the password, userid and token to backend

            try {

                const res = await axios.post(`${process.env.REACT_APP_HOSTNAME}/api/users/resetPassword`, {
                    uid: uid,
                    token: token,
                    newPassword: newPassword
                })
                
                setSuccess('success')
                setDisable(false)

                setTimeout(function(){
                    navigate('/login')
                }, 2000)
                
                
            } catch (error: unknown) {
                if(axios.isAxiosError(error)){
                    console.log(error)
                    setSuccess('fail')
                    setErrorMessage(error.response?.data.error)
                    setDisable(false)
                }
            }
        }else{
            setSuccess('fail')
            setErrorMessage('New password does not match with confirm password')
            setDisable(false)
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
                        
                        <label>Enter New Password</label>
                        <div className="InputContainer">
                            <input 
                                type={passwordInputType} 
                                className="PasswordInput"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={disable}
                            />
                            <img 
                                src={showPassword? showPasswordEye : hidePasswordEye} 
                                className="PasswordIcon"
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                    setPasswordInputType(passwordInputType === 'text'? 'password':'text')
                                }}
                            />
                        </div>

                        <label>Re-Enter New Password</label>
                        <div className="InputContainer">
                            <input 
                                type={passwordInputType} 
                                className="PasswordInput"
                                value={cfmPassword}
                                onChange={(e) => setCfmPassword(e.target.value)}
                                disabled={disable}
                            />
                            <img 
                                src={showPassword? showPasswordEye : hidePasswordEye} 
                                className="PasswordIcon"
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                    setPasswordInputType(passwordInputType === 'text'? 'password':'text')
                                }}
                            />
                        </div>

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
                                <div style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
                                    <p>Your password has been successfully reset.</p>
                                    <p style={{marginTop: '-10px'}}>Redirecting you to the login page...</p>
                                </div>
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

export default ResetPassword;