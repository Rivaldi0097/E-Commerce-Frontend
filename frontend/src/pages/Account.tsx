"Use Client"

import { useEffect, useState } from 'react';
import { useGetUserQuery, useUpdateUserMutation } from '../redux/userSlice';
import "../styles/account.css";
import Cookies from 'universal-cookie';
import Loading from '../components/Loading';
import { UserModel } from '../models/userModel';

function Account() {

    var cookies = new Cookies();
    const {data, error, isLoading} = useGetUserQuery(cookies.get('userId'));
    const [updateUser, {isSuccess: updateSuccess, error: updateFailed}] = useUpdateUserMutation();
    const [disable, setDisable] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>('');

    const [username, setUsername] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNum, setPhoneNum] = useState<number | string>('');
    const [street, setStreet] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zip, setZip] = useState<number | string>('');

    useEffect(() => {

        if(data){
            setUsername(data.username)
            setFirstname(data.firstName)
            setLastname(data.lastName)
            setEmail(data.email)
            setPhoneNum(data.phoneNum)
            setStreet(data.address.street)
            setCity(data.address.city)
            setState(data.address.state)
            setZip(data.address.zip)
        }

    }, [data])

    const update = async () => {
        
        setResultMessage('')
        setDisable(true)

        const updatedData:UserModel = {
            userId: cookies.get('userId'),
            updated:{
                firstName: firstname,
                lastName: lastname,
                phoneNum: phoneNum,
                address:{
                    street: street,
                    city: city,
                    state: state,
                    zip: zip
                }
            }
        }


        await updateUser(updatedData)
        .unwrap()
        .then((res) => {

            setDisable(false)
            setResultMessage('Successfully updated')

        })
        .catch((err) => {

            setDisable(false)
            setResultMessage(err.data.error)
        })


    }

    return error?

            <div className='AccountContainer'>
                <div className='ErrorAccountOuterBox'>
                    There is an error...
                </div>
            </div>

        :
            isLoading?
                <Loading/>
            :

            <>
                <div className='AccountContainer'>

                    <div className='AccountOuterBox'>

                        <div className='UsernameFieldContainer'>
                            <div className='UsernameFieldChild'>
                                <h1>Welcome to your Profile, {username}!</h1>
                            </div>
                        </div>

                        
                        <div className='AccountFieldContainer'>
                            <div className='AccountFieldChild'>
                                <h2>User Details</h2>
                            </div>
                        </div>

                        <div className='AccountFieldContainer'>
                            <div className='AccountFieldChild'>
                                <label>First Name</label>
                                <input 
                                    type="text" 
                                    className="AccountTextField"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className='AccountFieldChild'>
                                <label>Last Name</label>
                                <input 
                                    type="text" 
                                    className="AccountTextField"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <div className='AccountFieldContainer'>
                            <div className='AccountFieldChild'>
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    className="AccountTextField"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={true}
                                />
                            </div>

                            <div className='AccountFieldChild'>
                                <label>Phone Number</label>
                                <input 
                                    type="number" 
                                    className="AccountTextField"
                                    value={phoneNum}
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <div className='AccountFieldContainer'>
                            <div className='AccountFieldChild'>
                                <h2>User Address</h2>
                            </div>
                        </div>

                        <div className='AccountFieldContainer'>
                            <div className='AccountFieldChild'>
                                <label>Street</label>
                                <input 
                                    type="text" 
                                    className="AccountTextField"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className='AccountFieldChild'>
                                <label>Postal Code</label>
                                <input 
                                    type="number" 
                                    className="AccountTextField"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <div className='AccountFieldContainer'>
                            <div className='AccountFieldChild'>
                                <label>City</label>
                                <input 
                                    type="text" 
                                    className="AccountTextField"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    disabled={disable}
                                />
                            </div>

                            <div className='AccountFieldChild'>
                                <label>State</label>
                                <input 
                                    type="text" 
                                    className="AccountTextField"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    disabled={disable}
                                />
                            </div>
                        </div>

                        <button
                            className='EditAccountButton'
                            onClick={update}
                        >
                            Edit
                        </button>
                        
                        {updateFailed?
                            <div className='AccountErrorMessage'>{resultMessage}</div>
                        :
                            updateSuccess?
                                <div className='AccountSuccessMessage'>{resultMessage}</div>
                            :
                                <></>
                        }
                    </div>
                </div>
            </>
            
}

export default Account;