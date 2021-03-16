// File: Residents.js
// Description: This is the residents page component. It displays a lsit of residents for 
//          a given property.

import React, {useEffect, useState} from 'react'
import Table from '../../../components/UserComponents/Table/Table';
import { useAuth } from '../../../context/AuthContext'
import './Dashboard.css'
import { MdDelete, MdAdd } from 'react-icons/md' 
import axios from 'axios';
import SearchForm from '../../../components/UserComponents/SearchForm/SearchForm';

export default function Residents({ property }) {

    // state to store resident list
    const [Residents, setResidents] = useState(null)
    const [ResidentsLoading, setResidentsLoading] = useState(false)
    const { Auth } = useAuth();
    const [NewResident, setNewResident] = useState({
        email: ''
    })
    const [SearchResident, setSearchResident] = useState({
        email: ''
    })

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

    const dummyInfo = [{
        name: 'dan',
        email: 'dan@email.com',
        role: 'owner'
    },
    {
        name: 'dan',
        email: 'dan@email.com',
        role: 'owner'
    },
    {
        name: 'dan',
        email: 'dan@email.com',
        role: 'owner'
    },
    {
        name: 'dan',
        email: 'dan@email.com',
        role: 'owner'
    }]

    const actions = [
        {
            icon: <MdDelete color={'#fff'} />,
            action: deleteClick,
            style: 'delete'
        }
    ]

    // Calls API to delete a resident when the delete button is clicked - removes the deleted resident from resident list
    function deleteClick(e) {
        console.log(e);
    }

    // opens a modal to add a user when add button is clicked
    function addClick() {
        // open the modal with the create resident form
        console.log('open add modal form');
    }

    // onClick event used for the search form
    function searchClick(e) {
        e.preventDefault()
    }

    function searchChange(e) {
        const {name, value} = e.target;

        setSearchResident({
            [name] : value
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
            const ret = await axios.post("http://localhost:5000/property/residents", body, config)

            // check if a user was successfully added to the resident list
            if(ret.resident){
                // add the newly created resident to the residents list to be displayed
                setResidents(prev => {
                    return [
                        ret.resident,
                        ...prev
                    ]
                })
            }
            // check for the error in the return 
            else if(ret.error){
                // set the error to the return error to show the user
                console.log(ret.error);
            }
            else{
                console.log('Something went wrong trying to add a new resident');
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }


    // useEffect, only loads on mount 
    useEffect(() => {
        // Function: getResidents
        // Description: This function calls the API to retrieve a list of residents for this property
        const getResidents = async () => {
            console.log('getting residents');
            setResidents([])
            setResidentsLoading(true)
        }

        getResidents()

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
                        <SearchForm onChange={searchChange} onSubmit={searchClick} searchData={SearchResident.email} placeholder={'email@someMail.com'}/>
                    </div>
                    <div>
                        <button className='add-user-btn'><MdAdd size='20px' color='#fff' /></button>
                    </div>
                </div>
                {ResidentsLoading ? <Table data={dummyInfo} columns={columns} actions={actions} /> : <h3>Loading Residents...</h3> }
            </div>
        </div>
    )
}
