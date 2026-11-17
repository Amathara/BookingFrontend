import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuthStore } from "@/utils/authStore";

export default function Login() {
    const { logIn, resetOnboarding } = useAuthStore();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const result = await logIn(email, password);

        if (result.error) {
            setError(result.msg || "Login failed");
        } else {
            setError("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button title="Log in" onPress={handleLogin} />
            <View style={styles.button}>
                <Button title="Sign Up" onPress={resetOnboarding} />
            </View>
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

    button: {
        marginTop: 10,
    }
});