// File: InvitationsPage.js
// Descritpion: This file contains the Invitations page
//      this shows the invitations that the logged in user has been issued 
//      as well as ones they, themselves have issued

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import Table from '../../components/UserComponents/Table/Table'
import { API_ACCESS } from '../../config/config'
import { useAuth } from '../../context/AuthContext'

import './styles/InvitationsPage.css'

export default function InvitationsPage() {

    const [Invitations, setInvitations] = useState([])
    const { Auth } = useAuth();

    useEffect(() => {
        // This will call the API to retrieve the invitations 
        const retrieveInvites = async() => {
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: Auth.token
                }
            }

            try{
                const res = await axios.post(`${API_ACCESS}/user/invitations`, null, config)
                // make sure the response is not null
                if(!res){
                    console.log('error retrieving data from API');
                    return;
                }
                // make sure there was not an error retrieving the data
                if(res.data.error){
                    console.log(res.data.error);
                }

                // make sure that the invites are in the data returned from api
                if(res.data.invites){
                    setInvitations(res.data.invites);
                }
            }
            catch(e)
            {
                console.log(e);
            }
        }

        retrieveInvites();

    }, [Auth.token])

    // resetClick
    // Onclick event that triggers when the user hits the refresh button

    const resetClick = async () => {
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: Auth.token
                }
            }

            try{
                const res = await axios.post(`${API_ACCESS}/user/invitations`, null, config)
                // make sure the response is not null
                if(!res){
                    console.log('error retrieving data from API');
                    return;
                }
                // make sure there was not an error retrieving the data
                if(res.data.error){
                    console.log(res.data.error);
                }

                // make sure that the invites are in the data returned from api
                if(res.data.invites){
                    setInvitations(res.data.invites);
                }
            }
            catch(e)
            {
                console.log(e);
            }    
        }

        // This defines the columns used to display invitation information
    const columns = [
        {
            headerName: 'Sender',
            name: 'sender',
            icon: null,
            style: {
                width: '1fr',
                minWidth: '100px'
            }
        },
        {
            headerName: 'Date Created',
            name: 'created',
            icon: null,
            style: {
                width: '1.5fr',
                minWidth: '150px'
            }
        },
        {
            headerName: 'Valid',
            name: 'valid',
            icon: null,
            style: {
                width: '.5fr',
                minWidth: '75px'
            }
        },
        {
            headerName: 'Expiration',
            name: 'expiration',
            icon: null,
            style: {
                width: '.5fr',
                minWidth: '75px'
            }
        }
    ]

    return (
        <div>
            <div className='invite-page-header'>
                <h2>My Invitations</h2>
            </div>
            <div className='invite-content'>
                <div className='invite-list'>
                <div className="invite-list-header">
                    <h3>My Invites</h3>
                    <div className='invite-btns'>
                    <button id='res-refresh-btn' className='user-btn' onClick={resetClick}><MdRefresh color={'#fff'} size='20px' /></button>
                    </div>
                </div>
                    <Table data={Invitations} columns={columns} />
                </div>
            </div>
        </div>
    )
}
