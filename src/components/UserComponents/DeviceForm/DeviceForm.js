// File: DeviceForm
// Description: This is the form used to add a new device

import React from 'react'
import './DeviceForm.css'

export default function DeviceForm({onSubmit, onChange, NewDevice}) {
    return (
        <form className="device-form" onSubmit={onSubmit}>
            <div className="device-form-head">
                <h2>New Device</h2>
            </div>
            <div className='device-form-fields'>
                <div className='device-form-item'>
                    <label>Device ID:</label>
                    <input type='id' name='id'  value={NewDevice.id} onChange={onChange} required/>
                </div>
                <div className='device-form-item'>
                    <label>Device Password:</label>
                    <input type='password' name='password' value={NewDevice.password} onChange={onChange} required/>
                </div>
                <div className='device-form-submit'>
                    <button className='device-submit-btn' type='submit' >Add Device</button>
                </div>
            </div>
        </form>
    )
}
