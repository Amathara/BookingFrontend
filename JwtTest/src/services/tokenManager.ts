import { secureStorage } from './secureStorage';

interface TokenState {
   accessToken: string | null;
   accessTokenExpiry: number | null;
}

class TokenManager {
    private state: TokenState = {
        accessToken: null,
        accessTokenExpiry: null,
    };

    //Store access token in memory
    setAccessToken(token: string, expiresIn: number): void {
        this.state.accessToken = token;
        this.state.accessTokenExpiry = Date.now() + expiresIn * 1000;
    }

    // Get current access token
    getAccessToken(): string | null {
        if (this.isAccessTokenExpired()) {
            return null;
        }
        return this.state.accessToken;
    }

    // Check if access token is expired
    isAccessTokenExpired(): boolean {
        if (!this.state.accessTokenExpiry) {
            return true;
        }
        // Add 30-second buffer before expiration
        return Date.now() >= this.state.accessTokenExpiry - 30000;
    }

    // Get time until expiration in seconds
    getTimeUntilExpiry(): number {
        if (!this.state.accessTokenExpiry) {
            return 0;
        }
        return Math.max(0, Math.floor((this.state.accessTokenExpiry - Date.now()) / 1000));
    }

    //Clear access token from memory
    clearAccessToken(): void {
        this.state.accessToken = null;
        this.state.accessTokenExpiry = null;
    }

    //Store refresh token securely 
    async setRefreshToken(token: string): Promise<boolean> {
        return secureStorage.storeRefreshToken(token);
    }

    //Get refresh token from secure storage 
    async getRefreshToken(): Promise<string | null> {
        return secureStorage.getRefreshToken();
    }

    //Clear all tokens (logout)
    async clearAllTokens(): Promise<void> {
        this.clearAccessToken();
        await secureStorage.clearAllTokens();
    }
}

export const tokenManager = new TokenManager();