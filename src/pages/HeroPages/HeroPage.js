import React, { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import './styles/HeroPage.css'

export default function HeroPage() {

    const [NavOpen, setNavOpen] = useState(false)

    function navClick() {
        setNavOpen(!NavOpen)
    }
    
    return (
        <Router>

            <div className='hero-page'>
                {/* User Page Nav */}
                <div className='visitor-nav'>
                    <div className='visitor-nav-title'>
                        <h3>Gate <span>Access Management Systems</span></h3>
                    </div>
                    <div className="menu-icon" onClick={navClick}>
                        {NavOpen ? <MdClose /> : <MdMenu />}
                    </div>
                    <div className={NavOpen ? 'visitor-nav-routes active' : 'visitor-nav-routes'}>
                        <Link onClick={navClick} to='/'><span className="nav-links">Login</span></Link>
                        <Link onClick={navClick} to='/register'><span className="nav-links">Sign Up</span></Link>
                    </div>
                </div>
                <div className='content'>
                    <Switch>
                        <Route exact path='/' component={LoginPage} />
                        <Route  path='/register' component={RegisterPage} />
                        <Route path='*'>
                            <Redirect to='/' />
                        </Route>
                    </Switch>
                </div>
            </div>

        </Router>
    )
}
