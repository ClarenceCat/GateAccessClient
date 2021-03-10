import React from 'react'
import {Route, Redirect, Switch, useRouteMatch} from 'react-router-dom'

export default function OwnerPage({property}) {

    const { path } = useRouteMatch()

    return (
        <div>
            <h1>Owner Page</h1>
            <h1>{property.name}</h1>
            {/* Create Navigation side menu */}

            {/* set up routes */}
            <Switch>
                <Route exact path={`${path}`} >
                    <h1>Home</h1>
                </Route>
                <Route  path={`${path}/Admins`} >
                    <h1>Admins</h1>
                </Route>
                <Route  path={`${path}/Residents`} >
                    <h1>Residents</h1>
                </Route>
                <Route  path={`${path}/Tokens`} >
                    <h1>Tokens</h1>
                </Route>
                <Route  path={`${path}/Events`} >
                    <h1>Events</h1>
                </Route>
                <Route  path={`${path}/Devices`} >
                    <h1>Devices</h1>
                </Route>
                <Route path='*'>
                    <Redirect to={`${path}`} />
                </Route>
            </Switch>
        </div>
    )
}
