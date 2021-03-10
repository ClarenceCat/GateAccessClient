import { createContext, useReducer, useContext } from 'react'
import { propertyReducer } from '../reducers/propertyReducer'

export const PropertyContext = createContext()

export const useProperty = () => {
    return useContext(PropertyContext)
}

export default function PropertyContextProvider({children}) {

    const [Property, propertyDispatch] = useReducer(propertyReducer, null)

    return (
        <PropertyContext.Provider value={{Property, propertyDispatch}}>
            { children }
        </PropertyContext.Provider>
    )
}
