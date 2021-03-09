import React from 'react'
import './LoginForm.css'

export default function LoginForm({onChange, onSubmit, UserLogin, Error }) {
    return (
        <form onSubmit={onSubmit} className='loginForm'>
            <div className="inner-form">
                <h1>Login</h1>
                <p>Login to see what's happening in your building!</p>
                <div>{Error}</div>
                <hr/>

                <div className="form-inputs">
                    <label>
                        Email:
                        <input className="text-input" type="email" name="email" placeholder="janeSmith@email.com" onChange={onChange} value={UserLogin.email} required></input>
                    </label>
                    <label>
                        Password:
                        <input className="text-input" type="password" name="password" onChange={onChange} value={UserLogin.password} required></input>
                    </label>

                    <button type="submit" >Login</button> 
                </div>

            </div>
        </form>
    )
}
