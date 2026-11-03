import { styles } from "@/assets/StyleSheets/Styles";
import { Image } from 'expo-image';
import { ScrollView, View } from "react-native";
import Axios from "../app/AxiosExample";
import Cafe from "../app/catCafe";
const thisImage = require('@/assets/images/expo-badge.png')

const App = () => {
    return (
        <ScrollView>
       <View>
        <Cafe/>
       </View>


       <View>
        <Axios/>
       </View>

       <View>
        <Image source={thisImage} style={styles.image}/>
       </View>
       </ScrollView>

    );
};


export default App;
