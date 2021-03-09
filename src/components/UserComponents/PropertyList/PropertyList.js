// File: PropertyList.js
// Description: This component generates a list of properties

import React from 'react'
import PropertyItem from '../PropertyItem/PropertyItem'

// import css
import './PropertyList.css'

export default function PropertyList({properties, addPropertyClick}) {
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
                    return <PropertyItem key={property.id} property={property} />
                })}
            </div>
        </div>
    )
}
