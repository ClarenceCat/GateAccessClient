// File: PropertySideNav.js
// Description: This is the side nav component used on the property specific pages 
//      The nav is specific to a given user role within a property

// import css for component
import { Link } from 'react-router-dom'
import './PropertySideNav.css'

export default function PropertySideNav({property, url, navType}) {
    return (
        <div className='property-side-nav'>
            <div className='property-side-nav-header'>
                <h3>{property.name}</h3>
                <h4>{property.address}</h4>
                <p>{property.role}</p>
            </div>
            <div className='property-side-nav-links'>
                {navType.map((navItem, index) => {
                    return (
                        <div className='property-side-nav-item'>
                            <Link to={`${url}${navItem.route}`} key={index}>{navItem.name}</Link>
                        </div>
                        )
                })}
            </div>
        </div>
    )
}
