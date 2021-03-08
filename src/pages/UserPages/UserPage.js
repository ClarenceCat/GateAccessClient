import React from 'react'
import {useAuth} from '../../context/AuthContext'

export default function UserPage() {

    const {Auth, setAuth} = useAuth()

    const onClick = () => {
        setAuth({
            token: '',
            user: null
        })
    }

    return (
        <div>
            <button onClick={onClick}>Logout</button>
            <h1>User Page</h1>
            <h3>{Auth.user.email}</h3>
        </div>
    )
}
