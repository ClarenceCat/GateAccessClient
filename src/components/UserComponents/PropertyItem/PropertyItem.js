import React from 'react'

// import css
import './PropertyItem.css'

export default function PropertyItem({property}) {
    return (
        <div className='property-item'>
            <div className='property-info'>
                <h1>{property.name}</h1>
                <h3>{property.address}</h3>
            </div>
            <div>
                <p>{property.role}</p>
            </div>
        </div>
    )
}
