// File: ResidentLog.js
// Description: This page displays the entry log for a resident of a property

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import Table from '../../../components/UserComponents/Table/Table'
import { API_ACCESS } from '../../../config/config';
import { useAuth } from '../../../context/AuthContext'

export default function ResidentLog({property}) {

    const { Auth } = useAuth();
    const [Logs, setLogs] = useState([])

    // useeffect runs only on page render
    useEffect(() => {
        // function to retrieve all eventlog events from api
        async function retrieveLogs () {
            // create header
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: Auth.token,
                    property: property.id
                }
            }

            try {
                // make call to api to retrieve the 
                const ret_logs = await axios.get(`${API_ACCESS}/user/entrylog`, config);

                if(ret_logs.data.entrylog){
                    setLogs(ret_logs.data.entrylog);
                }

            }
            catch(e){
                console.log(e);
            }
        }

        retrieveLogs();

    }, [Auth.token, property.id])

    const columns = [
        {
            headerName: 'Authorized',
            name: 'authorized',
            icon: null,
            style: {
                width: '1fr',
                minWidth: '100px'
            }
        },
        {
            headerName: 'Entry Timestamp',
            name: 'timestamp',
            icon: null,
            style: {
                width: '1.5fr',
                minWidth: '150px',
                textAlign: 'right'
            }
        }
    ]

    async function resetClick() {
        // create header
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }

        try {
            // make call to api to retrieve the 
            const ret_logs = await axios.get(`${API_ACCESS}/user/entrylog`, config);

            if(ret_logs.data.entrylog){
                setLogs(ret_logs.data.entrylog);
            }

        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <div className='user-page-header'>
                <h1>Entry Log</h1>
            </div>
            <div className='user-details'>
                <div className='user-header'>
                    <div className='user-search'>
                        <h2>Entry Log</h2>
                    </div>
                    <div className='user-buttons'>
                        <button id='res-refresh-btn' className='user-btn' onClick={resetClick}><MdRefresh color={'#fff'} size='20px' /></button>
                    </div>
                </div>
                <Table data={Logs} columns={columns} /> 
            </div>
        </div>
    )
}
