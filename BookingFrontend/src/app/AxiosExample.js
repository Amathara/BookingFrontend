import axios from "axios";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Axios() {
 
    const [advice, setAdvice] = useState("");

    const getRandomId = (min, max) => {
      min = Math.ceil(min); //Ensuring min is rounded up
      max = Math.floor(max);//ensuring max is rounded down

      //Returning a random integer between min and max (inclusive) as a string
      return (Math.floor(Math.random() * (max-min+1)) + min).toString();
    };

    //function to fetch advice from API:
    const getAdvice = () => {
      axios
      .get("https://api.adviceslip.com/advice/" + getRandomId(1,200))
      .then((response)=>{
        setAdvice(response.data.slip.advice);
      })

    }; 
    
  

   // Rendering the UI
  return (
    <View style={styles.container}>
      {/* Displaying the fetched advice */}
      <Text style={styles.advice}>{advice}</Text>
      {/* Button to trigger the getAdvice function */}
      <Button title="Get Advice"
        onPress={getAdvice} color="green" />
    </View>
  );
}

// Defining styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full screen
    backgroundColor: "#fff", // Sets the background color to white
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
  },
  advice: {
    fontSize: 20, // Sets the font size for the advice text
    fontWeight: "bold", // Makes the advice text bold
    marginHorizontal: 20, // Adds horizontal margin to the advice text
  },
});