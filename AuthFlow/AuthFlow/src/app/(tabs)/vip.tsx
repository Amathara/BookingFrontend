import { Link } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";

export default function VipScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Only VIPs allowed</Text>
      <Text style={styles.emoji}> 💅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "indigo",
  },
  text: {
    fontFamily:"serif",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 30,
    color: "gold",
    
  },

  emoji: {
    fontSize: 35,
    lineHeight: 30,
  },
});
