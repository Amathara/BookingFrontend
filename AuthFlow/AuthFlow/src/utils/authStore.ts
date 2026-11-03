import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {getItem, setItem, deleteItemAsync} from "expo-secure-store";

type UserState = {
    isLoggedIn: boolean;
    shouldCreateAccount: boolean;
    hasCompletedOnboarding: boolean;
    isVip: boolean;


    logIn:() => void;
    logOut:() => void;
    completeOnboarding:() => void;
    resetOnboarding:() => void;
    logInAsVip: () => void;
}

export const useAuthStore = create(
    persist<UserState>((set) => ({

    isLoggedIn: false,
    shouldCreateAccount: false,
    hasCompletedOnboarding: false,
    isVip: false,

    logIn: () => {
        set((state) => {
            return{
            ...state,
            isLoggedIn:true,
        };
        });    
    },

     logOut: () => {
        set((state) => {
            return{
            ...state,
            isLoggedIn:false,
            isVip: false,
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

}),
{
 name: "auth-store",
 storage: createJSONStorage(()=>({
    setItem,
    getItem,
    removeItem: deleteItemAsync,
 }))

} )
);