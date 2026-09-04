import { createContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import useHttp from '../hooks/useHttp'
import { getProfile, login } from '../lib/apis'

const UserContext = createContext({
    isLoggedIn: false,
    role: null,
    email: null,
    loginUser: () => { },
    logoutUser: ()=> {}
})

export const UserContextProvider = ({ children }) => {
    const navigate = useNavigate()

    const {
        sendRequest: loadProfile,
        status: profileStatus,
        data: profile,
    } = useHttp(getProfile);

    const {
        sendRequest: loginRequest,
        status: loginStatus,
        data: loginData,
    } = useHttp(login);

    useEffect(() => {
        if (loginStatus !== 'completed' || !loginData) {
            return
        }
        localStorage.setItem('token', loginData.token);
        loadProfile();
        navigate('/');
    }, [loginStatus, loginData]);

    useEffect(() => {
        loadProfile()
    }, [])

    const loginUser = (userCredentials) => {
        loginRequest(userCredentials)
    }

    const logoutUser = () => {
        localStorage.removeItem('token');
        loadProfile();
    }

    const contextValue = {
        loginUser,
        isLoggedIn: Boolean(profile),
        email: profile?.email,
        role: profile?.role,
        logoutUser
    }

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserContext
