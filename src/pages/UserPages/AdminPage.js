import React from 'react'

export default function AdminPage({property}) {
    return (
        <div>
            <h1>Admin Page</h1>
            <h1>{property.name}</h1>
        </div>
    )
}
