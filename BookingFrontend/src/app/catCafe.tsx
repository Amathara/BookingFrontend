import { useState } from "react";
import { Button, Text, View } from "react-native";


type Cat = {
name: string;
};

const Cat = (props: Cat) => {
    const [isHungry, setIsHungry] = useState(true);

    return(
<View>
    <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
    </Text>
    <Button
    onPress={() => {
        setIsHungry(false);
    }}
    disabled={!isHungry}
    title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
    />  
</View>
    );
};

const Cafe = () => {
    return (
        <>
        <Cat name="Rose"/>
        <Cat name ="Frank"/>
        <Cat name="Bent"/>
        </>
    );
};

export default Cafe;