import React from 'react'
import { useParams } from 'react-router-dom'

export default function PropertyPage() {

    const { property_id } = useParams();

    return (
        <div>
            <h1>{property_id}</h1>
        </div>
    )
}
