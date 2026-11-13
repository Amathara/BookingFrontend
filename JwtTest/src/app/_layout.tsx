import { Stack } from "expo-router";
import { useEffect } from "react";
import {useAuthStore} from "@/utils/authStore";

export default function RootLayout() {
    

    const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    isVip,
    isAuthReady,
    initializeAuth
} = useAuthStore();


    useEffect(() => {
        initializeAuth();
    }, []);

    if (!isAuthReady) {
        return null;
    }

    return (
      <Stack>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="logIn" />
            </Stack.Protected>

            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="index" />
            </Stack.Protected>

            <Stack.Protected guard={isLoggedIn && isVip}>
                <Stack.Screen name="admin" />
            </Stack.Protected>
        </Stack>

    ); 
}
