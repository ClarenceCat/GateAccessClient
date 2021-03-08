import React from 'react'
import './RegisterForm.css'

export default function RegisterForm({onChange, onSubmit, NewUser, Error}) {
    return (
        <div className="signUpForm">
            <form onSubmit={onSubmit}>
                <div className="inner-form">
                    <div className="signup-form-header">
                        <h1>Sign Up</h1>
                        <p>Make building access easier and more convenient</p>
                        <hr />
                        <div><p className='error-msg'>{Error}</p></div>
                    </div>
                    <div className="signup-form-inputs">
                        <label>
                            First Name: 
                            <input className="text-input" type="text" name="firstName" placeholder="e.g. Jane" value={NewUser.firstName} onChange={onChange} required ></input>
                        </label>
                        <label>
                            Last Name:
                            <input className="text-input" type="text" name="lastName" placeholder="e.g. Smith" value={NewUser.lastName} onChange={onChange} required ></input>
                        </label>
                        <label>
                            Email:
                            <input className="text-input" type="email" name="email" placeholder="e.g. janeSmith@email.com" value={NewUser.email} onChange={onChange} required ></input>
                        </label>
                        <label>
                            Password:
                            <input className="text-input" type="password" name="password" value={NewUser.password} onChange={onChange} required ></input>
                        </label>
                        <label>
                            Confirm Password: 
                            <input className="text-input" type="password" name="confirmPassword" value={NewUser.confirmPassword} onChange={onChange} required ></input>
                        </label>
                        <button type="submit" >Sign Up</button>
                    </div>
                </div>

            </form>
        </div>
    )
}
