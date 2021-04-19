// File: PropertyContext.js
// Description: This file contains the context setup for the Property Context
//  This context is used to hold property information so it can be accessed accross the
//  User dashboards

import { createContext, useReducer, useContext } from 'react'
import { propertyReducer } from '../reducers/propertyReducer'

export const PropertyContext = createContext()

// Function: useProperty()
// Description: This function is called to access the property context
// Returns: an instance of the property context
export const useProperty = () => {
    return useContext(PropertyContext)
}

// Component: PropertyContextProvider
// Description: any component wrapped inside of this will have access to the property context 
export default function PropertyContextProvider({children}) {

    const [Property, propertyDispatch] = useReducer(propertyReducer, null)

    return (
        <PropertyContext.Provider value={{Property, propertyDispatch}}>
            { children }
        </PropertyContext.Provider>
    )
}
