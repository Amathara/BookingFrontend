import { useAuthStore } from "@/utils/authStore";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Settings() {

    const {logOut} = useAuthStore();

  return (
    <View style={styles.container}>
      <Text>Settings Here</Text>
      <Button title="Sign Out!" onPress={logOut}/>
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
