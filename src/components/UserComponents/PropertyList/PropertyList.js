// File: PropertyList.js
// Description: This component generates a list of properties

import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import PropertyItem from '../PropertyItem/PropertyItem'
import {useProperty} from '../../../context/PropertyContext'

// import css
import './PropertyList.css'

export default function PropertyList({properties, addPropertyClick}) {

    const { url } = useRouteMatch()
    const history = useHistory()

    // gets the dispatcher from the PropertyContext
    const { propertyDispatch } = useProperty();

    // onclick event that triggers when the user clicks on the propertyItem 
    const propertyClick = (property) => {
        // set the selected property to the selected property
        propertyDispatch({ type: 'SELECT_PROPERTY', property: property })

        // navigate to the property's specific page
        history.push(`${url}/${property.id}`)
    }

    return (
        <div className='property-list'>
            <div className='list-title'>
                <h1>Properties</h1>
                <div>
                    <button className='add-prop-btn' onClick={addPropertyClick}>+</button>
                </div>
            </div>
            <hr />
            <div className='property-item-list'>
                {properties.map((property) => {
                    return (
                            <PropertyItem key={property.id} property={property} onClick={propertyClick} /> 
                        )
                })}
            </div>
        </div>
    )
}
