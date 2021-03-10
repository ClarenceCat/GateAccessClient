import React from 'react'
import { useProperty } from '../../context/PropertyContext'
import AdminPage from './AdminPage'
import OwnerPage from './OwnerPage'
import ResidentPage from './ResidentPage'

export default function PropertyPage() {
    // get the property from the state
    const { Property } = useProperty()

    // return page based on user role
    return (
        <>
            {Property.role === 'owner' ? <OwnerPage property={Property} /> : null}
            {Property.role === 'admin' ? <AdminPage property={Property} /> : null}
            {Property.role === 'resident' ? <ResidentPage property={Property} /> : null}
        </>
    )
}
