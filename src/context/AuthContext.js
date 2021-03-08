// File: AuthContext.js
// Programmer: Daniel Grew
// Description: Contains the logic for the auth context, used throughout the app to store the user information

import { createContext, useState, useContext } from 'react'

// create the context
const AuthContext = createContext({
    token: '',
    user: null
})

/*
    Function: useAuth
    Parameters: none
    Description: called to access the context 
*/
export const useAuth = () => {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    // create state
    const [Auth, setAuth] = useState(AuthContext)

    return (
        <AuthContext.Provider value={{Auth, setAuth}}>
            { children }
        </AuthContext.Provider>
    )
}
