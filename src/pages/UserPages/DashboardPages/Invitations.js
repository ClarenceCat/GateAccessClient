// File: Invitations.js
// Description: This contains the invitations page displayed for residents so they are able to view 
//      invitations that they have issued for their property

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdAdd, MdRefresh, MdCancel } from 'react-icons/md'
import InvitationForm from '../../../components/UserComponents/InvitationForm/InvitationForm'
import Modal from '../../../components/UserComponents/Modal/Modal'
import Table from '../../../components/UserComponents/Table/Table'
import { API_ACCESS } from '../../../config/config'
import { useAuth } from '../../../context/AuthContext'

export default function Invitations({property}) {

    const { Auth } = useAuth();
    const [Tokens, setTokens] = useState([])
    const [NewTokenModal, setNewTokenModal] = useState(false)

    const [NewInvite, setNewInvite] = useState({
        email: '',
        expiration: new Date().toISOString().slice(0, 10)
    })

    // define columns to display in table
    const columns = [
        {
            headerName: 'Recipient',
            name: 'recipient',
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

    const actions = [
        {
            icon: <MdCancel size='15px' color={'#fff'} />,
            action: removeClick,
            style: 'delete'
        }
    ]

    // useeffect triggers when the component loads (when the page loads)
    useEffect(() => {

        const getTokens = async () => {
            // create header
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: Auth.token,
                    property: property.id
                }
            }

            try{
                // make request to the API
                const ret = await axios.post(`${API_ACCESS}/user/property/invitations`, null, config);

                // check if the api has sent back an error
                if(ret.data.error){
                    console.log(ret.data.error);
                }
                else if(ret.data.invites){
                    // check if the api has successfully returned data
                    setTokens(ret.data.invites)
                }
                else{
                    // external case - something went wrong on the API side
                    console.log('Error loading the tokens from the API');
                }
            }
            catch(e){
                console.log(e);
            }
        }

        // call function to get tokens
        getTokens();

    }, [Auth.token, property.id])

    // resetClick
    // onclick event for the reset button
    const resetClick = async () => {
        await fetchTokens();
    }

    const fetchTokens = async () => {
        // create header
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }

        try{
            // make request to the API
            const ret = await axios.post(`${API_ACCESS}/user/property/invitations`, null, config);

            // check if the api has sent back an error
            if(ret.data.error){
                console.log(ret.data.error);
            }
            else if(ret.data.invites){
                // check if the api has successfully returned data
                setTokens(ret.data.invites)
            }
            else{
                // external case - something went wrong on the API side
                console.log('Error loading the tokens from the API');
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // onChangeForm
    // onchange event that changes state of NewInvite as Form inputs change
    const onFormChange = async(e) => {
        const { name, value } = e.target;

        setNewInvite(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    // onFormSubmit
    // onSubmit function that triggers when a user sends a new token
    const onFormSubmit = async(e) => {
        e.preventDefault();

        console.log(`${Date.parse(NewInvite.expiration)}`);

        // set up config to make API request
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }

        const body = {
            invitation: {
                email: NewInvite.email,
                expiration: Date.parse(NewInvite.expiration)
            }
        }

        // make request to API
        try{
            const res = await axios.post(`${API_ACCESS}/user/invitations/create`, body, config);
            // Check for an error response
            if(res.data.error){
                console.log(res.data.error);
            }
            else if(res.data.invitation){
                // if an invitation is returned then it worked and we can add it to the list of invitations (tokens)
                setTokens(prev => {
                    return [
                        res.data.invitation,
                        ...prev
                    ]
                })
            }
            else{
                console.log('Something went wrong trying to invite a user');
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async function removeClick(selected_token) {
        console.log(selected_token);
    }

    // addClick
    // onclick event for the add button
    const addClick = async () => {
        setNewTokenModal(true);
    }

    return (
        <div>
            <div className='user-page-header'>
                <h1>Property Invitations</h1>
            </div>
            <div className='user-details'>
                <div className='user-header'>
                    <div className='user-search'>
                        <h2>Invites</h2>
                    </div>
                    <div className='user-buttons'>
                        <button id='res-refresh-btn' className='user-btn' onClick={resetClick}><MdRefresh color={'#fff'} size='20px' /></button>
                        <button id='res-add-btn' className='user-btn' onClick={addClick} ><MdAdd size='20px' color='#fff' /></button>
                    </div>
                </div>
                <Table data={Tokens} columns={columns} actions={actions} /> 
            </div>
            {NewTokenModal ? (
                <Modal setModalOpen={setNewTokenModal} >
                    <InvitationForm onChange={onFormChange} setNewInvite={setNewInvite} newInvite={NewInvite} onSubmit={onFormSubmit} />
                </Modal>
                ) : null}
        </div>
    )
}
