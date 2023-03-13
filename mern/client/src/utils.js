const TOKEN_KEY = 'jwt';

export const login = () => sessionStorage.setItem(TOKEN_KEY, 'token_key');

export const logout = () => sessionStorage.removeItem(TOKEN_KEY);

export const isLoggedIn = () => {
    if (sessionStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}