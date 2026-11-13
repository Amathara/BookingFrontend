import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import { saveToken, deleteToken, getToken } from "@/utils/jwt";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {User} from "@/types/user";

type UserState = {
    isLoggedIn: boolean;
    shouldCreateAccount: boolean;
    hasCompletedOnboarding: boolean;
    isVip: boolean;
    isAuthReady: boolean;
    user: User | null;



    logIn:(email: string, password: string) => Promise<any>;
    logOut:() => Promise<void>;

    completeOnboarding:() => void;
    resetOnboarding:() => void;
    logInAsVip: () => void;
    initializeAuth: () => Promise<void>;
}


export const API_URL = "https://dummyjson.com";

export const useAuthStore = create(
    persist<UserState>((set) => ({

    isLoggedIn: false,
    shouldCreateAccount: false,
    hasCompletedOnboarding: false,
    isVip: false,
    isAuthReady: false,
    user: null,

    logIn: async (email: string, password: string) => {

        try {
            const result = await axios.post(`${API_URL}/auth/login`, {
                username: email,
                password,
            });

            const token = result.data.accessToken;

            await saveToken(token);

            console.log("Login successful!");

            // Get current authenticated user
            const user = await axios.get(`${API_URL}/auth/me`);

            console.log("Logged in as:", user.data.username);
            console.log("User role:", user.data.role); //remove this when moving to production!!

            
        
        set((state) => {
            return{
            ...state,
            isLoggedIn:true,
            user: {
            id: user.data.id,
            username: user.data.username,
            role: user.data.role,
        },
        };
        }); 
        
        return result;
    } catch (e) {
        return {
            error: true,
            msg: (e as any).response?.data?.message,
        };
    } 
    },

     logOut: async () => {
         await deleteToken(); //JWT logic in jwt.ts

        //Reset auth state
        set((state) => {
            return{
            ...state,
            
            isLoggedIn:false,
            isVip: false,
            user: null,
        };
        });    
    },

    completeOnboarding: () => {
        set((state) => {
            return{
            ...state,
            hasCompletedOnboarding:true,
        };
        });    
    },

    resetOnboarding: () => {
        set((state) => {
            return{
            ...state,
            hasCompletedOnboarding:false,
            isLoggedIn: false,
            isVip:false,
            user: null,
        };
        });    
    },

    logInAsVip: () => {
        set((state) => {
            return{
            ...state,
            isLoggedIn: true,
            isVip:true,
        };
        });    
    },

    initializeAuth: async () => {
    const token = await getToken();

    set((state) => {
        return {
            ...state,
            isLoggedIn: !!token,
            isAuthReady: true,
        };
    });
},

}),
{
 name: "auth-store",
 storage: createJSONStorage(()=>({
    setItem: SecureStore.setItemAsync,
    getItem: SecureStore.getItemAsync,
    removeItem: SecureStore.deleteItemAsync,
 })),


} )
);