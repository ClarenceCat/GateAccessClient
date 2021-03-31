import React, {useState} from 'react'
import RegisterForm from '../../components/HeroComponents/RegisterForm/RegisterForm'
import {useAuth} from '../../context/AuthContext'
import { API_ACCESS } from '../../config/config'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
 
const axios = require('axios')

export default function RegisterPage() {

    const {setAuth} = useAuth()

    const [Error, setError] = useState('')

    const [RegisterInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function onChange(e) {
        const {value, name} = e.target;

        setRegisterInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    async function onSubmit(e) {
        // prevent the default submit action
        e.preventDefault();
        
        // create header for axios
        const header = {
            "Content-Type" : 'application/json'
        }

        // create body
        const body = {
            firstName: RegisterInfo.firstName,
            lastName: RegisterInfo.lastName,
            email: RegisterInfo.email,
            password: RegisterInfo.password,
        }

        try{
            // send to api to create user
            const res = await axios.post(`${API_ACCESS}/auth/signup`, body, header)
            
            setAuth({
                token: res.data.token,
                user: res.data.user
            })

        }catch(e){
            setError(e.response.data.error)
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

    return (
        <div>
            <ToastContainer />
            <RegisterForm NewUser={RegisterInfo} onChange={onChange} onSubmit={onSubmit} Error={Error} />
        </div>
    )
}
