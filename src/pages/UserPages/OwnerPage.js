import React from 'react'
import {Route, Redirect, Switch, useRouteMatch} from 'react-router-dom'
import PropertySideNav from '../../components/PropertySideNav/PropertySideNav'
import { OwnerNavList } from '../../NavLists/PropertyNavLists'
import Admins from './DashboardPages/Admins'
import Dashboard from './DashboardPages/Dashboard'
import Devices from './DashboardPages/Devices'
import Residents from './DashboardPages/Residents'
import Tokens from './DashboardPages/Tokens'

import './styles/PropertyPage.css'

export default function OwnerPage({property}) {

    const { path, url } = useRouteMatch()

    return (
        <div>
            {/* Create Navigation side menu */}
            <div className='property-page-sidenav'>
                <PropertySideNav property={property} url={url} navType={OwnerNavList} />
            </div>
            {/* set up routes */}
            <div className='property-page-main'>
                <Switch>
                    <Route exact path={`${path}`} >
                        <Dashboard property={property} />
                    </Route>
                    <Route  path={`${path}/Admins`} >
                        <Admins property={property} />
                    </Route>
                    <Route  path={`${path}/Residents`} >
                        <Residents property={property} />
                    </Route>
                    <Route  path={`${path}/Tokens`} >
                        <Tokens property={property} />
                    </Route>
                    <Route  path={`${path}/Events`} >
                        <h1>Events</h1>
                    </Route>
                    <Route  path={`${path}/Devices`} >
                        <Devices property={property} />
                    </Route>
                    <Route path='*'>
                        <Redirect to={`${path}`} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
