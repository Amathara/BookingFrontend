import { Stack } from "expo-router";

const isLoggedIn = false;
const isAdmin = false;

export default function RootLayout() {
  return ( <Stack>

    <Stack.Protected guard={!isLoggedIn}>
    <Stack.Screen name="login"/>
    </Stack.Protected>

<Stack.Protected guard={isLoggedIn}>
  <Stack.Protected guard={isAdmin}>
    <Stack.Screen name="protected/onlyAdmin"/>
  </Stack.Protected>
    <Stack.Screen name="protected/anyUser"/>
    </Stack.Protected>

  </Stack>
  );
  }
