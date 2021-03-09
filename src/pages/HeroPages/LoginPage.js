import React, {useState} from 'react'
import LoginForm from '../../components/HeroComponents/LoginForm/LoginForm'
import {useAuth} from '../../context/AuthContext'

const axios = require('axios')

export default function LoginPage() {

    const {setAuth} = useAuth()

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
                const res = await axios.post('http://localhost:5000/auth/signin', body, header)

                setAuth({
                    token: res.data.token,
                    user: res.data.user
                })

            }catch(e){
                setError(e.response.data.error);
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
            <LoginForm onChange={onChange} onSubmit={handleSubmit} UserLogin={UserLogin} />
        </div>
    )
}
