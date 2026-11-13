import * as SecureStore from "expo-secure-store";
import axios from "axios";

const TOKEN_KEY = "my-jwt";

export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getToken = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return token;
};

export const deleteToken = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";
};