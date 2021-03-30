// File: InvitationForm.js
// Description: Form for creating an invitation

import React, { useEffect } from 'react'

import './InvitationForm.css'

export default function InvitationForm({onSubmit, newInvite, setNewInvite, onChange}) {

    useEffect(() => {
        setNewInvite({
            email: '',
            expiration: new Date().toISOString().slice(0, 10)
        })
    }, [setNewInvite])

    return (
        <form onSubmit={onSubmit} className='invitation-form'>
            <div className="invitation-form-head">
                <h2>New Invitation</h2>
            </div>
            <div className='invitation-form-fields'>
                <div className='invitation-form-item'>
                    <label>Recipient</label>
                    <input type='email' name='email' placeholder='somebody@onceToldme.com' value={newInvite.email} onChange={onChange} required/>
                </div>
                <div className='invitation-form-item'>
                    <label>Expiration Date</label>
                    <input type='date' name='expiration' value={newInvite.expiration} onChange={onChange} required/>
                </div>
                <div className='invitation-form-submit'>
                    <button className='invitation-submit-btn' type='submit' >Send Invite</button>
                </div>
            </div>
        </form>
    )
}
