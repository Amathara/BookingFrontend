import { Text, View, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "@/utils/authStore";

export default function SignInScreen() {
const {logIn} = useAuthStore();

  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button title="Sign In!" onPress={logIn}/>
      <Link asChild push href="/modal">
      <Button title="Open Modal (disabled)" disabled/>
      </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
  },
});
