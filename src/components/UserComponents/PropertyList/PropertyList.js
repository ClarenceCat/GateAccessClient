// File: PropertyList.js
// Description: This component generates a list of properties

import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import PropertyItem from '../PropertyItem/PropertyItem'

// import css
import './PropertyList.css'

export default function PropertyList({properties, addPropertyClick}) {

    const { url } = useRouteMatch()

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
                        <Link style={{textDecoration: 'none'}} key={property.id} to={`${url}/${property.id}`}>
                            <PropertyItem  property={property} />
                        </Link>
                        )
                })}
            </div>
        </div>
    )
}
