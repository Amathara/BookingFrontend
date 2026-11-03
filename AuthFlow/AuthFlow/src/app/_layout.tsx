import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";


export default function RootLayout() {
  const {isLoggedIn, shouldCreateAccount, hasCompletedOnboarding} = useAuthStore();

  return <Stack>
    <Stack.Protected guard={isLoggedIn}>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    <Stack.Screen name="modal" options={{presentation: "formSheet"}}/> 
    </Stack.Protected>

    <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
      <Stack.Screen name="sign-in"/>
      <Stack.Protected guard={shouldCreateAccount}>
        <Stack.Screen name="create-account"/> 
      </Stack.Protected>
    </Stack.Protected>

    <Stack.Protected guard={!hasCompletedOnboarding}>
      <Stack.Screen name="onboarding" options={{headerShown: false}}/>
    </Stack.Protected>

  </Stack>;
}
