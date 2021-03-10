// File: PropertySideNav.js
// Description: This is the side nav component used on the property specific pages 
//      The nav is specific to a given user role within a property

// import css for component
import './PropertySideNav.css'

export default function PropertySideNav({property}) {
    return (
        <div className='property-side-nav'>
            <div className='property-side-nav-header'>
                <h3>{property.name}</h3>
                <h4>{property.address}</h4>
                <p>{property.role}</p>
            </div>
            <div className='property-side-nav-links'>

            </div>
        </div>
    )
}
