// File: AddUserForm.js
// Description: This component is a form used to add either Residents or Admins

import React from 'react'
import './AddUserForm.css'

export default function AddUserForm({onSubmit, userType, addEmail, onChange}) {
    return (
        <form onSubmit={onSubmit}>
            <h4>Add {userType}</h4>
            <p>Enter the email of the resident you would like to add</p>
            <div className='new-user-form-content'>
                <input type='email' name='newUserEmail' className='new-user-email' placeholder={`${userType}@email.com`} onChange={onChange} value={addEmail} required />
                <button type='submit' className='new-user-sub-btn' >Add {userType}</button>
            </div>
        </form>
    )
}
