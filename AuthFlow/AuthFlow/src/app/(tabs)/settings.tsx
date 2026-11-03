import { useAuthStore } from "@/utils/authStore";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Settings() {

    const {logOut} = useAuthStore();
    const {resetOnboarding} = useAuthStore();

  return (
    <View style={styles.container}>
      <Text>Settings Here</Text>
      <Button title="Sign Out!" onPress={logOut}/>
      <Button title="Reset App!" onPress={resetOnboarding}/>
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
