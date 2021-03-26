// File: PropertyForm.js
// Description: Contains the form used to create a new property

import axios from 'axios'
import React, { useState } from 'react'
import './PropertyForm.css'

export default function PropertyForm({setModalOpen, setProperties, Auth, properties}) {

    const [PropertyData, setPropertyData] = useState({
        name: '',
        address: ''
    })

    const [DeviceData, setDeviceData] = useState({
        id: '',
        password: ''
    })

    async function onSubmit(e){
        e.preventDefault()

        // set the config for the api call
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': Auth.token
            }
        }

        // set the body for the api call
        const body = {
            property: {
                name: PropertyData.name,
                address: PropertyData.address
            },
            device : {
                id: DeviceData.id,
                password: DeviceData.password
            }
        }

        try{
            // call the api to create new property for the user
            const retProperty = await axios.post('http://localhost:5000/user/properties', body, config)

            // load the list of properties into a buffer list to add new property to
            const newPropertyList = properties;
            // add the returned property to the list of properties
            newPropertyList.push(retProperty.data.property)

            // update the properties list to reflect the newly added property
            setProperties(newPropertyList)

            // close the modal
            setModalOpen(false)
            
        }catch(e){
            console.log(e);
        }
    }

    function onChange (e) {
        const { value, name } = e.target;

        setPropertyData(PrevData => {
             return {
                ...PrevData,
                [name]: value
            }
        });
    }

    function changeDeviceData(e) {
        const {value, name } = e.target;

        setDeviceData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    } 

    return (
        <form className='property-form' onSubmit={onSubmit}>
            <div className='property-form-title'>
                <h1>Register a new Property</h1>
                <hr />
                <p>Fill in property details to get started</p>
            </div>
            <div className='property-form-content'>
                <div className='property-form-item'>
                    <label>Property Name: </label>
                    <input id='name' name='name' type='text' placeholder='My Property Name' value={PropertyData.name} onChange={onChange} required/>
                </div>
                <div className='property-form-item'>
                    <label>Property Address: </label>
                    <input id='address' name='address' type='text' placeholder='123 address avenue' value={PropertyData.address} onChange={onChange} required />
                </div>
                <div className='property-form-item'>
                    <label>Device ID: </label>
                    <input id='id' name='id' type='text'  value={DeviceData.id} onChange={changeDeviceData} required />
                </div>
                <div className='property-form-item'>
                    <label>Device Password: </label>
                    <input id='password' name='password' type='password' value={DeviceData.password} onChange={changeDeviceData} required />
                </div>
                <div className='property-form-submit'>
                    <button type='submit'>Done</button> 
                </div>
            </div>
        </form>
    )
}
