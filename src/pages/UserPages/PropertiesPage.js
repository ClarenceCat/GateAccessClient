// File: PropertiesPage.js
// Description: This file contains the base routes for the properties and the property specific pages

import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import PropertyPage from './PropertyPage'
import PropertySelectPage from './PropertySelectPage'


export default function PropertiesPage() {
    const {path} = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path} >
                <PropertySelectPage />
            </Route>
            <Route path={`${path}/:property_id`}>
                <PropertyPage />
            </Route>
        </Switch>
    )
}
