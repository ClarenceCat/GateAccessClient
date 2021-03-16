// File: UserPage.js
// Description: This file contains the base page for the user pages - this is where the base routes
//          for the user pages exists

import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import PropertiesPage from './PropertiesPage'
import './styles/UserPage.css'

export default function UserPage() {

    const {logout} = useAuth()

    const onClick = () => {
        // call logout
        logout()
    }

    return (
        <Router>
            <div className='user-page'>
            {/* create top nav with logout */}
                <div className='user-nav'>
                    <button onClick={onClick}>Logout</button>
                </div>
                <Route exact path='/'>
                    <Redirect to='/properties' />
                </Route>
                <Route path='/properties'>
                    <PropertiesPage />
                </Route>
            </div>
        </Router>
    )
}
