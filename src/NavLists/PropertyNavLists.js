// File PropertyNavLists.js
// Description: This file contains list of navigation links for specific user roles
//          used in user specific property pages (Owner, Admin, Resident)

export const OwnerNavList = [
    {
        name: 'Dashboard',
        route: ''
    },
    {
        name: 'Admins',
        route: '/Admins'
    },
    {
        name: 'Residents',
        route: '/Residents'
    },
    {
        name: 'Tokens',
        route: '/Tokens'
    },
    {
        name: 'Event Log',
        route: '/Events'
    },
    {
        name: 'Devices',
        route: '/Devices'
    }
]

export const ResidentNavList = [
    {
        name: 'Entry Log',
        route: '/Entries'
    },
    {
        name: 'Invitations',
        route: '/Invitations'
    }
]