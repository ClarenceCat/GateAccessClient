import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import './styles/HeroPage.css'

export default function HeroPage() {
    
    return (
        <Router>

            <div className='hero-page'>
                {/* User Page Nav */}
                <div className='visitor-nav'>
                    <div className='visitor-nav-title'>
                        <h3>Gate <span>Access Management Systems</span></h3>
                    </div>
                    <div className='visitor-nav-routes'>
                        <Link to='/'>Login</Link>
                        <Link to='/register'>Sign Up</Link>
                    </div>
                </div>
                <div className='content'>
                    <Switch>
                        <Route exact path='/' component={LoginPage} />
                        <Route  path='/register' component={RegisterPage} />
                    </Switch>
                </div>
            </div>

        </Router>
    )
}
