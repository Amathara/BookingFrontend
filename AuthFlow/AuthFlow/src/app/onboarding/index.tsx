import { Link } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";

export default function OnboardingFirstScreen() {
  return (
    <View style={styles.container}>
      <Text>Onboarding Screen 1</Text>
      <Link asChild push href="/onboarding/final">
      <Button title="Go to screen 2"/>
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
