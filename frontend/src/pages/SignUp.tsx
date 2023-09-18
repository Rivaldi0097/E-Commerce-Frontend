"Use client"

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import Logo from "../assets/logo-no-background.svg";
import axios from "axios";

interface SignupResponse {
    _id: string,
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email: string,
    phoneNumber: number,
    address:{
        street: string,
        city: string,
        state: string,
        zip: number
    }
}

function SignUp() {

    const nagivate = useNavigate();
    const [disable, setDisable] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<number | string>('');
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [zip, setZip] = useState<number | string>('');

 

    const register = async () => {
        setDisable(true)

        try{
            const res = await axios.post(`${process.env.REACT_APP_HOSTNAME}/api/users/`, {
                firstName: firstName,
                lastName: lastName,
                username: userName,
                password: password,
                email: email,
                phoneNum: phoneNumber,
                address:{
                    street: address,
                    city: city,
                    state: state,
                    zip: zip
                }
            })
    
            localStorage.setItem("userId", res.data._id)
            setDisable(false)
            nagivate('/')

        }catch (err){
            console.log(err)
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

                        <h1>Welcome! Sign up here!</h1>

                        <div className="NameFlexbox">
                            <div className="LabelAndField">
                                <label>First Name</label>
                                <input 
                                    type="text" 
                                    className="LoginTextField"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className="LabelAndField">
                                <label>Last Name</label>
                                <input 
                                    type="text" 
                                    className="LoginTextField"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <br/>

                        <div className="NameFlexbox">
                            <div className="LabelAndField">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    className="LoginTextField"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className="LabelAndField">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    className="LoginTextField"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <br/>

                        <div className="NameFlexbox">
                            <div className="LabelAndField">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    className="LoginTextField"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className="LabelAndField">
                                <label>Phone Number</label>
                                <input 
                                    type="number" 
                                    className="LoginTextField"
                                    value={phoneNumber === 0? '' : phoneNumber}
                                    onChange={(e) => setPhoneNumber(Number(e.target.value))}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <br/>

                        <div className="NameFlexbox">
                            <div className="LabelAndField">
                                <label>City</label>
                                <input 
                                    type="text" 
                                    className="LoginTextField"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className="LabelAndField">
                                <label>State</label>
                                <input 
                                    type="text" 
                                    className="LoginTextField"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <br/>

                        <div className="NameFlexbox">
                            <div className="LabelAndField">
                                <label>Address</label>
                                <input 
                                    type="text" 
                                    className="LoginTextField"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className="LabelAndField">
                                <label>Postal Code</label>
                                <input 
                                    type="number" 
                                    className="LoginTextField"
                                    value={zip === 0? '' : zip}
                                    onChange={(e) => setZip(Number(e.target.value))}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <br/>

                        <button 
                            className="LoginButton"
                            onClick={register}
                            disabled={disable}
                        >
                            Register
                        </button>

                </div>
            </div>

        </div>
    );
}

export default SignUp;