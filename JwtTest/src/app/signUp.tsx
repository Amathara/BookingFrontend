import { use, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useAuthStore } from "@/utils/authStore";

export default function Signup() {
     const { completeSignUp} = useAuthStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async () => {
        try {
            const result = await axios.post("https://dummyjson.com/users/add", {
                username,
                password,
                role,
            });

            console.log("User created:", result.data);
            setError("");
            return true;
            
        } catch (e) {
            setError("Could not create account");
            return false;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create account</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Role (admin or user)"
                value={role}
                onChangeText={setRole}
                secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
                title="Sign Up"
                onPress={async () => {
                   const success = await handleSignup();
                    if (success) {
                        completeSignUp();
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
    },
    error: {
        color: "red",
        marginBottom: 12,
    },
});