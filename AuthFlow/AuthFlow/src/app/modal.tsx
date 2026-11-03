import { Text, View, StyleSheet } from "react-native";

export default function ModalScreenScreen() {
  return (
    <View style={styles.container}>
      <Text>Modal Screen Here</Text>
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
