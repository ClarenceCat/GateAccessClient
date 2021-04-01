import React from 'react'
import {Route, Redirect, Switch, useRouteMatch} from 'react-router-dom'
import PropertySideNav from '../../components/PropertySideNav/PropertySideNav'
import { AdminNavList } from '../../NavLists/PropertyNavLists'
import Dashboard from './DashboardPages/Dashboard'
import Devices from './DashboardPages/Devices'
import PropertyLog from './DashboardPages/PropertyLog'
import Residents from './DashboardPages/Residents'
import Tokens from './DashboardPages/Tokens'

import './styles/PropertyPage.css'

export default function AdminPage({property}) {

    const { path, url } = useRouteMatch()

    return (
        <div>
            {/* Create Navigation side menu */}
            <div className='property-page-sidenav'>
                <PropertySideNav property={property} url={url} navType={AdminNavList} />
            </div>
            {/* set up routes */}
            <div className='property-page-main'>
                <Switch>
                    <Route exact path={`${path}`} >
                        <Dashboard property={property} />
                    </Route>
                    <Route  path={`${path}/Residents`} >
                        <Residents property={property} />
                    </Route>
                    <Route  path={`${path}/Tokens`} >
                        <Tokens property={property} />
                    </Route>
                    <Route  path={`${path}/Events`} >
                        <PropertyLog property={property}/>
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
