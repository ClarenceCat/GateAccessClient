import React from 'react'
import { MdRefresh } from 'react-icons/md'
import Table from '../../../components/UserComponents/Table/Table'

export default function PropertyLog({property}) {

    const columns = [
        {
            headerName: 'Actor',
            name: 'actor',
            icon: null,
            style: {
                width: '1fr',
                minWidth: '100px'
            }
        },
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

    function resetClick() {
        console.log("click");
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
                <Table data={[]} columns={columns} /> 
            </div>
        </div>
    )
}
