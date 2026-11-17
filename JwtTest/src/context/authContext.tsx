import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogIn?: (email: string, password: string) => Promise<any>;
    onLogOut?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://dummyjson.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext (AuthContext);
};


export const AuthProvider = ({children}: any) => {

    // State manager for tokens and auth:
    const [authState, setAuthstate] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored:", token)
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthstate({
                    token: token,
                    authenticated: true,
                });
            }

        }
        loadToken();

    }, [])

    // Sign Up:
    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users`, {email, password});
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg};
        }
    };

    // Log In

    const logIn = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth`, {email, password});

            console.log("file: AuthContext.tsx: 41 ~ login ~ result:", result)

            setAuthstate({
                token: result.data.token,
                authenticated: true
            });

            // Axios helps with auth:
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token );

            return result; 

        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg};
        }
    };

    // Log out:
    const logOut = async () => {
        //Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        //Update HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';

        //Reset auth state
        setAuthstate({
            token: null,
            authenticated: false
        });

    };

    const value = {
        OnRegister: register,
        onLogIn: logIn,
        onLogOut: logOut,
        authState
    };
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}