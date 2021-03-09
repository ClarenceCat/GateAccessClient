// File: PropertySelectPage.js
// Description: This file contains the page used to display a list of user properties
//          This is the endpoint of the user routes and should appear as {path}/properties

import React, { useState, useEffect } from 'react'
import PropertyList from '../../components/UserComponents/PropertyList/PropertyList'
import { useAuth } from '../../context/AuthContext'
import './styles/UserPage.css'

const axios = require('axios')

// import styling

export default function PropertySelectPage() {

    // get current auth from the auth context
    const { Auth } = useAuth()

    const [Properties, setProperties] = useState(null)

    useEffect(() => {
        // function to retrieve property list from API
        const retrieveProperties = async () => {
            // construct api call

            // construct header for axios call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            // add the token to the headers
            config.headers['authorization'] = Auth.token;

            try {
                const res = await axios.get('http://localhost:5000/user/properties', config)
                
                // set the properties using the response from the api 
                setProperties(res.data.properties)
            }catch(e){
                console.log(e);
            }
        }

        retrieveProperties();

    })

    const addPropertyClick = () => {
        console.log('click');
    }

    return (
        <div className='property-select-page'>
            {Properties === null ? (
                <h1>Properties are loading...</h1>
            ) : (
                <PropertyList properties={Properties} addPropertyClick={addPropertyClick} />
            )}
        </div>
    )
}
