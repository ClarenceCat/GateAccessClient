import React, {useState} from 'react'
import LoginForm from '../../components/HeroComponents/LoginForm/LoginForm'
import {useAuth} from '../../context/AuthContext'
import { API_ACCESS } from '../../config/config'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const axios = require('axios')

export default function LoginPage() {

    const { login } = useAuth()

    const [UserLogin, setUserLogin] = useState({email: '', password: ''})

    const [Error, setError] = useState('')

    async function handleSubmit(e) {
        // prvent page from re-rendering
        e.preventDefault();

        if(UserLogin.email === null || UserLogin.password === null)
        {
            return;
        }else{
            const header = {
                "Content-Type" : 'application/json'
            }

            const body = {
                email: UserLogin.email,
                password: UserLogin.password
            }

            try{
                const res = await axios.post(`${API_ACCESS}/auth/signin`, body, header)

                // setAuth({
                //     token: res.data.token,
                //     user: res.data.user
                // })
                if(!res.data.error)
                {
                    login(res.data)
                }
                else{
                    toast.error(res.data.error, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    })
                }

            }catch(e){
                setError(e.response.data.error);
                toast.error(e.response.data.error, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
        }
    }

    // change event listener for form inputs
    function onChange(e) {
        const {value, name} = e.target;

        setUserLogin(preValue => {
            return {
                ...preValue,
                [name]: value
            }
        });
    }

    return (
        <div className='page'>
            <ToastContainer />
            <LoginForm onChange={onChange} onSubmit={handleSubmit} UserLogin={UserLogin} Error={Error}/>
        </div>
    )
}
