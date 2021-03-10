// File: AuthContext.js
// Programmer: Daniel Grew
// Description: Contains the logic for the auth context, used throughout the app to store the user information

import { createContext, useState, useContext, useEffect } from 'react'

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

    useEffect(() => {

        // check for user in session storage
        const savedAuth = JSON.parse(sessionStorage.getItem('auth'))

        savedAuth ? setAuth({token: savedAuth.token, user: savedAuth.user}) : setAuth({token: '', user: null})

    }, [])

    const login = (credentials) => {
        // add auth to session storage
        // sessionStorage.setItem('auth', JSON.stringify(credentials))

        // set the user auth info
        setAuth({
            token: credentials.token,
            user: credentials.user
        })
    }

    const logout = () => {
        // remove auth from session storage
        // sessionStorage.removeItem('auth')

        // reset the auth state to initial value
        setAuth({
            token: '',
            user: null
        })
    }

    return (
        <AuthContext.Provider value={{Auth, setAuth, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}
