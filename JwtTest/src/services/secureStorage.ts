import * as Keychain from 'expo-secure-store'

//This is a Secure Store service.

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

class SecureStorageService {
    // Store refresh token securely using Keychain/Keystore

    async storeRefreshToken(token: string): Promise<boolean> {
        try {
            await Keychain.setItemAsync(REFRESH_TOKEN_KEY, token, {
                keychainAccessible: Keychain.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            });
            return true;
        } catch (error) {
            console.error('Failed to store refresh token:', error);
            return false;
        }
    }

    //Retrieve refresh token from secure storage
    async getRefreshToken(): Promise<string | null> {
        try {
            const token = await Keychain.getItemAsync(REFRESH_TOKEN_KEY);
            if (token) {
                return token;
            }
            return null;
        } catch (error) {
            console.error('Failed to retrieve refresh token:', error);
            return null;
        }
    }

    // Remove refresh token from storage
    async removeRefreshToken(): Promise<boolean> {
        try {
            await Keychain.deleteItemAsync(REFRESH_TOKEN_KEY);
            return true;
        } catch (error) {
           console.error('Failed to remove refresh token:', error);
           return false;
        }
    }

    // Clear all authentication data
    async clearAllTokens(): Promise<void> {
        await this.removeRefreshToken();
    }
}

export const secureStorage = new SecureStorageService();
