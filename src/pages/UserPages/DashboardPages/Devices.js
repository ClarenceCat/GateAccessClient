// File: Devices.js
// Description: This is the devices page. It displays a list of devices that belong to the property

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdAdd, MdRefresh } from 'react-icons/md';
import DeviceForm from '../../../components/UserComponents/DeviceForm/DeviceForm';
import Modal from '../../../components/UserComponents/Modal/Modal';
import Table from '../../../components/UserComponents/Table/Table';
import { API_ACCESS } from '../../../config/config';
import { useAuth } from '../../../context/AuthContext'

export default function Devices({property}) {

    const [Devices, setDevices] = useState([])
    const [NewDevice, setNewDevice] = useState({
        id: '',
        password: ''
    })
    const [NewDeviceModal, setNewDeviceModal] = useState(false)
    const { Auth } = useAuth();

    useEffect(() => {
        // this function calls the API and requests the devices for the current property
        const retrieveDevices = async () => {
            // construct config
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    authorization: Auth.token,
                    property: property.id
                }
            }

            try{
                // make a request to the API
                const res = await axios.get(`${API_ACCESS}/devices`, config)

                if(res.data.error){
                    console.log(res.data.error);
                }
                else if(res.data.devices){
                    setDevices(res.data.devices)
                }
                else{
                    console.log("Error retrieving devices");
                }

            }
            catch(e){
                console.log(e);
            }
        }

        retrieveDevices();

    }, [Auth.token, property.id])

    const columns = [
        {
            headerName: 'Device Name',
            name: 'name',
            icon: null,
            style: {
                width: '1fr',
                minWidth: '100px'
            }
        }
    ]

    async function fetchDevices(){
        // construct config
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }

        try{
            // make a request to the API
            const res = await axios.get(`${API_ACCESS}/devices`, config)

            if(res.data.error){
                console.log(res.data.error);
            }
            else if(res.data.devices){
                setDevices(res.data.devices)
            }
            else{
                console.log("Error retrieving devices");
            }

        }
        catch(e){
            console.log(e);
        }
    }

    // resetClick
    // onClick handler which fetches updated Device data from the APU
    async function resetClick() {
        await fetchDevices();
    }

    // addClick
    // onClick handler which opens the modal to add a new device
    async function addClick(){
        setNewDeviceModal(true)
    }

    // onFormSubmit
    // triggers when user submits form - makes api request to add a device to the property
    async function onFormSubmit(e) {
        e.preventDefault();

        // make api call to add device
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }

        // the body contains the new device information
        const body = {
            device: {
                id: NewDevice.id,
                password: NewDevice.password
            }
        }

        try{
            // call the api to add device
            const res = await axios.post(`${API_ACCESS}/device/add`, body, config)

            if(res.data.device){
                setDevices(prev => {
                    return [
                        res.data.device,
                        ...prev
                    ]
                })
            }
        }
        catch(e){
            console.log(e);
        }

        // reset the NewDevice state
        setNewDevice({
            id: '',
            password: ''
        })

        // close modal
        setNewDeviceModal(false)
    }

    // onChange for the form - updates the NewDevice user enters info
    function onFormChange(e) {
        const { name, value } = e.target;

        setNewDevice(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <div>
            <div className='user-page-header'>
                <h1>Property Devices Page</h1>
            </div>
            <div className='user-details'>
                <div className='user-header'>
                    <div className='user-search'>
                        <h2>Devices</h2>
                    </div>
                    <div className='user-buttons'>
                        <button id='res-refresh-btn' className='user-btn' onClick={resetClick}><MdRefresh color={'#fff'} size='20px' /></button>
                        <button id='res-add-btn' className='user-btn' onClick={addClick} ><MdAdd size='20px' color='#fff' /></button>
                    </div>
                </div>
                <Table data={Devices} columns={columns} /> 
            </div>
            {NewDeviceModal ? (
                <Modal setModalOpen={setNewDeviceModal}>
                    <DeviceForm onSubmit={onFormSubmit} onChange={onFormChange} NewDevice={NewDevice} />
                </Modal> 
            ) : null}

        </div>
    )
}
