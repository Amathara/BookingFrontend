import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";


// const shouldCreateAccount = false; <- for redirect, but we're moving it to _layout.
export default function CreateAccountScreen() {
    // if (!shouldCreateAccount){
    //     return <Redirect href="/sign-in"/>;
    // } <- Redirect in action :) Might be useful?
  return (
    <View style={styles.container}>
      <Text>Create Account</Text>
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
