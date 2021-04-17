// File: Admins.js 
// Description: This file continas the Admins page component - this page displays a list of admins 
//          and allows a property owner to add and remove Admins associated with a property

import React, {useEffect, useState} from 'react'
import Table from '../../../components/UserComponents/Table/Table';
import { useAuth } from '../../../context/AuthContext'
import './Dashboard.css'
import { MdDelete, MdAdd, MdRefresh } from 'react-icons/md' 
import axios from 'axios';
import SearchForm from '../../../components/UserComponents/SearchForm/SearchForm';
import Modal from '../../../components/UserComponents/Modal/Modal'
import AddUserForm from '../../../components/UserComponents/AddUserForm/AddUserForm';
import {API_ACCESS} from '../../../config/config'


export default function Admins({ property }) {

    // state to store admin list
    const [Admins, setAdmins] = useState([])
    const [AdminsLoading, setAdminsLoading] = useState(true)
    const { Auth } = useAuth();
    const [NewAdmin, setNewAdmin] = useState({
        email: ''
    })
    const [SearchAdmin, setSearchAdmin] = useState({
        email: ''
    })
    const [ModalOpen, setModalOpen] = useState(false)

    const columns = [
        {
            headerName: 'Name',
            name: 'name',
            icon: null,
            style: {
                width: '1fr',
                minWidth: '100px'
            }
        },
        {
            headerName: 'Email',
            name: 'email',
            icon: null,
            style: {
                width: '1.5fr',
                minWidth: '150px'
            }
        },
        {
            headerName: 'Role',
            name: 'role',
            icon: null,
            style: {
                width: '.5fr',
                minWidth: '75px'
            }
        }
    ]

    const actions = [
        {
            icon: <MdDelete color={'#fff'} />,
            action: deleteClick,
            style: 'delete'
        }
    ]

    
    // Function: getAdmins()
    // Description: This function calls the api to retrieve a list of admins
    async function getAdmins(res_email = null) {
        // construct config 
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }


        try{
            // req variable used to store response data from the API
            let req = null;

            if(res_email === null)
            {
                // attempt to make get request using axios
                req = await axios.get(`${API_ACCESS}/property/admins`, config)
                console.log(req);
            }
            else{
                // set up the request body
                const body = {
                    email: res_email
                }
                // post request to serach for a specific admins
                req = await axios.post(`${API_ACCESS}/property/admins/search`, body, config) 
            }
            
            return req;

        }catch(e) {
            console.log(e);
            return null;
        }
    }

    // Calls API to delete a admin when the delete button is clicked - removes the deleted admin from admin list
    async function deleteClick(deleteUser) {
        // set up config to make API request
        const config = {
            headers: {
                authorization: Auth.token,
                property: property.id
            }
        }
        // set up body of request
        const body = {
            email: deleteUser.email
        }

        try{
            // make axios request
            const res = await axios.patch(`${API_ACCESS}/property/admins`, body, config)
            // check for error
            if(res.data.error){
                console.log(res.data.error);
            } 
            else if(res.data.user){
                // fetch new list of admins from API and update the admins list
                const new_admins_list = await getAdmins();

                if(new_admins_list === null){
                    console.log('There was an error loading admins');
                    return;
                }

                // check if a list of admins was returned 
                if(new_admins_list.data.admins)
                {
                    // set the admins state to the list of returned admins 
                    setAdmins(new_admins_list.data.admins)
                }
                else if(new_admins_list.data.error)
                {
                    console.log(new_admins_list.data.error);
                }
                else{
                    console.log('Something went wrong attempting to fetch updated list of users');
                }

            }
            else{
                console.log('failed to remove admin');
            }

        }catch(e){
            console.log(e);
        }
    }

    // opens a modal to add a user when add button is clicked
    function addClick() {
        // open the modal with the create admin form
        setModalOpen(true)
    }

    // Onclick event listening to the reset button 
    // Calls a function to retrieve all admins for this specific property
    async function resetClick() {
        // call function to retrieve admin list from API
        const admins_data = await getAdmins();

        if(admins_data === null){
            console.log('something went wrong trying to refresh');
            return
        }

        if(admins_data.data.error){
            console.log(admins_data.data.error);
        }
        else if(admins_data.data.admins){
            // set admins to the response data from the API
            setAdmins(admins_data.data.admins);
        }
        else{
            console.log('Something went wrong trying to display admins');
        }
    }

    // onClick event used for the search form
    async function searchSubmit(e) {
        e.preventDefault()

        // call the getAdmins function to retrieve list of admins from the api with matching email
        const res_list = await getAdmins(SearchAdmin.email);

        if(res_list === null)
        {
            setSearchAdmin({
                email: ''
            })
            return;
        }
        // check for error
        if(res_list.data.error){
            console.log(res_list.data.error);
        }
        else if(res_list.data.admins){
            // add set the current user list to the response list
            setAdmins(res_list.data.admins)
        }
        else{
            console.log('Something unexpected has happened');
        }

        // reset search box
        setSearchAdmin({
            email: ''
        })

    }

    function searchChange(e) {
        const {name, value} = e.target;

        setSearchAdmin({
            [name] : value
        })
    }

    // AddUserChange - updates new user as form updates
    function AddUserChange(e){
        const { value } = e.target;

        setNewAdmin({
            email: value
        })
    }

    // accesses the API to add a admin to the list of admins for a building
    async function addSubmit(e) {
        e.preventDefault();

        // call the API to add a new admin @POST property/admins
        // set up config with headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }
        const body = {
            email: NewAdmin.email
        }

        try{
            // call the api
            const ret = await axios.post(`${API_ACCESS}/property/admins`, body, config)

            // check if a user was successfully added to the admin list
            if(ret.data.admin){
                // add the newly created admin to the admins list to be displayed
                setAdmins(prev => {
                    return [
                        ret.data.admin,
                        ...prev
                    ]
                })
            }
            // check for the error in the return 
            else if(ret.data.error){
                // set the error to the return error to show the user
                console.log(ret.data.error);
            }
            else{
                console.log('Something went wrong trying to add a new admin');
            }
        }
        catch(error)
        {
            console.log(error);
        }

        setNewAdmin({
            email: ''
        })
    }

        // useEffect, only loads on mount 
        useEffect(() => {
            // Function: fetchAdmins
            // Description: This function calls the API to retrieve a list of admins for this property
            const fetchAdmins = async () => {
                // construct config 
                const config = {
                    headers: {
                        'Content-Type' : 'application/json',
                        authorization: Auth.token,
                        property: property.id
                    }
                }
    
                try{
    
                    // attempt to make get request using axios
                    const req = await axios.get(`${API_ACCESS}/property/admins`, config)
    
                    // check for error
                    if(req.data.error)
                    {
                        console.log(req.data.error);
                    }
                    else if(req.data.admins){
                        // set the admin list to the response from the api
                        setAdmins(req.data.admins)
                    }
                    
    
                }catch(e) {
                    console.log(e.response.data.error);
                }
                // set the AdminsLodaing value to false
                setAdminsLoading(false)
            }
    
            fetchAdmins()
    
        }, [property.id, Auth.token])


    return (
        <div className='user-page'>
            <div className='user-page-header'>
                <h1>Admins Page</h1>
            </div>
            <div className='user-details'>
                <div className='user-header'>
                    <div className='user-search'>
                        <h2>Admins</h2>
                        <SearchForm onChange={searchChange} onSubmit={searchSubmit} searchData={SearchAdmin.email} placeholder={'email@someMail.com'}/>
                    </div>
                    <div className='user-buttons'>
                        <button id='res-refresh-btn' className='user-btn' onClick={resetClick}><MdRefresh color={'#fff'} size='20px' /></button>
                        <button id='res-add-btn' className='user-btn' onClick={addClick} ><MdAdd size='20px' color='#fff' /></button>
                    </div>
                </div>
                {!AdminsLoading ? <Table data={Admins} columns={columns} actions={actions} /> : <h3>Loading Admins...</h3> }
            </div>
            {ModalOpen ? (
                <Modal setModalOpen={setModalOpen} >
                    <AddUserForm onSubmit={addSubmit} userType={'Admin'} addEmail={NewAdmin.email} onChange={AddUserChange} />
                </Modal>
            ) : null}
        </div>
    )
}
