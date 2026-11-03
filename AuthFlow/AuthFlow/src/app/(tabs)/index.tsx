import { Link } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Link asChild push href="/modal">
      <Button title="Open Modal"/>
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
    backgroundColor: "lightBlue",
  },
});
