import { useAuthStore } from "@/utils/authStore";

import { Text, View, StyleSheet, Button } from "react-native";

export default function OnboardingFinalScreen() {
  const {completeOnboarding} = useAuthStore();
  return (


    <View style={styles.container}>
      <Text>Onboarding Screen 2</Text>
      
      <Button title="Complete Onboarding" onPress={completeOnboarding}/>
      
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
