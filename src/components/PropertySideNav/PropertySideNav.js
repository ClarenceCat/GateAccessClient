// File: PropertySideNav.js
// Description: This is the side nav component used on the property specific pages 
//      The nav is specific to a given user role within a property

// import css for component
import {useState} from 'react'
import { Link } from 'react-router-dom'
import './PropertySideNav.css'
import { FaBars } from 'react-icons/fa'

export default function PropertySideNav({property, url, navType}) {

    // useState - used to toggle navbar
    const [SideBarToggled, setSideBarToggled] = useState(false)

    // toggles side bar
    const toggleSideBar = () => {
        setSideBarToggled(!SideBarToggled)
    }

    return (
        <div className={SideBarToggled ? 'property-side-nav' : 'property-side-nav active'}>
            <div className='side-nav-header'>
                <FaBars size={'35px'} onClick={() => toggleSideBar()} />
            </div>
            <div className='property-side-nav-title'>
                <h3>{property.name}</h3>
                <h4>{property.address}</h4>
                <p>{property.role}</p>
            </div>
            <ul className='property-side-nav-links' onClick={() => {toggleSideBar()}}>
                {navType.map((navItem, index) => {
                    return (
                        <li className='property-side-nav-item' key={index}>
                            <Link to={`${url}${navItem.route}`} >{navItem.name}</Link>
                        </li>
                        )
                })}
            </ul>
        </div>
    )
}
