import React from 'react'
import { useParams } from 'react-router-dom'
import { useProperty } from '../../context/PropertyContext'

export default function PropertyPage() {

    const { property_id } = useParams();

    // get the property from the state
    const { Property } = useProperty()

    return (
        <div>
            <h1>{property_id}</h1>
        </div>
    )
}
