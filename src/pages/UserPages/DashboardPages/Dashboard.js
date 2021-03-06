import React, {useEffect} from 'react'
import { useAuth } from '../../../context/AuthContext'
import { API_ACCESS } from '../../../config/config'
const axios = require('axios')

export default function Dashboard({property}) {

    const { Auth } = useAuth();

    useEffect(() => {
        const retrieveDetails = async () => {
            // set up the config headers to call api
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: Auth.token,
                    property: property.id
                }
            } 

            try{
                // call api to retrieve info
                const response = await axios.get(`${API_ACCESS}/property`, config)
                console.log(response.data);

            }catch(e){
                console.log(e);
            }

        }

        retrieveDetails()

    }, [Auth.token, property.id])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
