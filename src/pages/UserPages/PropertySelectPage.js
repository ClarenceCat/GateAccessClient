// File: PropertySelectPage.js
// Description: This file contains the page used to display a list of user properties
//          This is the endpoint of the user routes and should appear as {path}/properties

import React, { useState, useEffect } from 'react'
import PropertyList from '../../components/UserComponents/PropertyList/PropertyList'
import Modal from '../../components/UserComponents/Modal/Modal'
import { useAuth } from '../../context/AuthContext'
import './styles/UserPage.css'
import PropertyForm from '../../components/UserComponents/PropertyForm/PropertyForm'

const axios = require('axios')

// import styling

export default function PropertySelectPage() {

    // get current auth from the auth context
    const { Auth } = useAuth()

    // used to store properties retrieved from the api
    const [Properties, setProperties] = useState(null)

    // used for handling the add property modal
    const [ModalOpen, setModalOpen] = useState(false)

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

    }, [Auth.token])

    const addPropertyClick = () => {
        setModalOpen(true)
    }

    return (
        <div className='property-select-page'>
            {Properties === null ? (
                <h1>Properties are loading...</h1>
            ) : (
                <>
                    <PropertyList properties={Properties} addPropertyClick={addPropertyClick} />
                    {ModalOpen ? (
                        <Modal setModalOpen={setModalOpen}>
                            <PropertyForm setModalOpen={setModalOpen} setProperties={setProperties} Auth={Auth} properties={Properties} />
                        </Modal>
                    ) : null}
                </>
            )}
        </div>
    )
}
