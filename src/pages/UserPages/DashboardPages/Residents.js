// File: Residents.js
// Description: This is the residents page component. It displays a lsit of residents for 
//          a given property.

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

export default function Residents({ property }) {

    // state to store resident list
    const [Residents, setResidents] = useState([])
    const [ResidentsLoading, setResidentsLoading] = useState(true)
    const { Auth } = useAuth();
    const [NewResident, setNewResident] = useState({
        email: ''
    })
    const [SearchResident, setSearchResident] = useState({
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

    async function getResidents(res_email = null) {
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
                req = await axios.get(`${API_ACCESS}/property/residents`, config)
                console.log(req);
            }
            else{
                // set up the request body
                const body = {
                    email: res_email
                }
                // post request to serach for a specific resident
                req = await axios.post(`${API_ACCESS}/property/residents/search`, body, config) 
            }
            
            return req;

        }catch(e) {
            console.log(e);
            return null;
        }
    }

    // Calls API to delete a resident when the delete button is clicked - removes the deleted resident from resident list
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
            const res = await axios.patch(`${API_ACCESS}/property/residents`, body, config)
            // check for error
            if(res.data.error){
                console.log(res.data.error);
            } 
            else if(res.data.user){
                // fetch new list of residents from API and update the residents list
                const new_residents_list = await getResidents();

                if(new_residents_list === null){
                    console.log('There was an error loading residents');
                    return;
                }

                // check if a list of residents was returned 
                if(new_residents_list.data.residents)
                {
                    // set the residents state to the list of returned residents 
                    setResidents(new_residents_list.data.residents)
                }
                else if(new_residents_list.data.error)
                {
                    console.log(new_residents_list.data.error);
                }
                else{
                    console.log('Something went wrong attempting to fetch updated list of users');
                }

            }
            else{
                console.log('failed to remove resident');
            }

        }catch(e){
            console.log(e);
        }
    }

    // opens a modal to add a user when add button is clicked
    function addClick() {
        // open the modal with the create resident form
        setModalOpen(true)
    }

    // Onclick event listening to the reset button 
    // Calls a function to retrieve all residents for this specific property
    async function resetClick() {
        // call function to retrieve resident list from API
        const residents_data = await getResidents();

        if(residents_data === null){
            console.log('something went wrong trying to refresh');
            return
        }

        if(residents_data.data.error){
            console.log(residents_data.data.error);
        }
        else if(residents_data.data.residents){
            // set residents to the response data from the API
            setResidents(residents_data.data.residents);
        }
        else{
            console.log('Something went wrong trying to display residents');
        }
    }

    // onClick event used for the search form
    async function searchSubmit(e) {
        e.preventDefault()

        // call the getResidents function to retrieve list of residents from the api with matching email
        const res_list = await getResidents(SearchResident.email);

        if(res_list === null)
        {
            setSearchResident({
                email: ''
            })
            return;
        }
        // check for error
        if(res_list.data.error){
            console.log(res_list.data.error);
        }
        else if(res_list.data.residents){
            // add set the current user list to the response list
            setResidents(res_list.data.residents)
        }
        else{
            console.log('Something unexpected has happened');
        }

        // reset search box
        setSearchResident({
            email: ''
        })

    }

    function searchChange(e) {
        const {name, value} = e.target;

        setSearchResident({
            [name] : value
        })
    }

    // AddUserChange - updates new user as form updates
    function AddUserChange(e){
        const { value } = e.target;

        setNewResident({
            email: value
        })
    }

    // accesses the API to add a resident to the list of residents for a building
    async function addSubmit(e) {
        e.preventDefault();

        // call the API to add a new Resident @POST property/residents
        // set up config with headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: Auth.token,
                property: property.id
            }
        }
        const body = {
            email: NewResident.email
        }

        try{
            // call the api
            const ret = await axios.post(`${API_ACCESS}/property/residents`, body, config)

            // check if a user was successfully added to the resident list
            if(ret.data.resident){
                // add the newly created resident to the residents list to be displayed
                setResidents(prev => {
                    return [
                        ret.data.resident,
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
                console.log('Something went wrong trying to add a new resident');
            }
        }
        catch(error)
        {
            console.log(error);
        }

        setNewResident({
            email: ''
        })
    }


    // useEffect, only loads on mount 
    useEffect(() => {
        // Function: getResidents
        // Description: This function calls the API to retrieve a list of residents for this property
        const fetchResidents = async () => {
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
                const req = await axios.get(`${API_ACCESS}/property/residents`, config)

                // check for error
                if(req.data.error)
                {
                    console.log(req.data.error);
                }
                else if(req.data.residents){
                    // set the residents list to the response from the api
                    setResidents(req.data.residents)
                }
                

            }catch(e) {
                console.log(e);
            }
            // set the ResidentsLoading value to false
            setResidentsLoading(false)
        }

        fetchResidents()

    }, [property.id, Auth.token])


    return (
        <div className='user-page'>
            <div className='user-page-header'>
                <h1>Residents Page</h1>
            </div>
            <div className='resident-details'>
                <div className='residents-header'>
                    <div className='resident-search'>
                        <h2>Residents</h2>
                        <SearchForm onChange={searchChange} onSubmit={searchSubmit} searchData={SearchResident.email} placeholder={'email@someMail.com'}/>
                    </div>
                    <div className='user-buttons'>
                        <button id='res-refresh-btn' className='user-btn' onClick={resetClick}><MdRefresh color={'#fff'} size='20px' /></button>
                        <button id='res-add-btn' className='user-btn' onClick={addClick} ><MdAdd size='20px' color='#fff' /></button>
                    </div>
                </div>
                {!ResidentsLoading ? <Table data={Residents} columns={columns} actions={actions} /> : <h3>Loading Residents...</h3> }
            </div>
            {ModalOpen ? (
                <Modal setModalOpen={setModalOpen} >
                    <AddUserForm onSubmit={addSubmit} userType={'Resident'} addEmail={NewResident.email} onChange={AddUserChange} />
                </Modal>
            ) : null}
        </div>
    )
}
