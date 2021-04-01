import React from 'react'
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'
import PropertySideNav from '../../components/PropertySideNav/PropertySideNav'
import { ResidentNavList } from '../../NavLists/PropertyNavLists'
import Invitations from './DashboardPages/Invitations'
import ResidentLog from './DashboardPages/ResidentLog'

export default function ResidentPage({property}) {

    const { path, url } = useRouteMatch()

    return (
        <div>
            <div className='property-page-sidenav'>
                <PropertySideNav property={property} url={url} navType={ResidentNavList} />
            </div>
            <div className='property-page-main'>
            <Switch>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/entries`} />
                </Route>
                <Route path={`${path}/Entries`}>
                    <ResidentLog property={property} />
                </Route>
                <Route path={`${path}/Invitations`}>
                    <Invitations property={property} />
                </Route>
                <Route path='*'>
                    <Redirect to={`${path}/Entries`} />
                </Route>
            </Switch>

            </div>
        </div>
    )
}
