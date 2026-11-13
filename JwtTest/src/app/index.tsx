import { View, Text, Button } from "react-native";
import { useAuthStore } from "@/utils/authStore";

export default function Index() {
    const { logOut } = useAuthStore();

    return (
        <View>
            <Text>Home screen</Text>

            <Button
                title="Log out"
                onPress={logOut}
            />
        </View>
    );
}