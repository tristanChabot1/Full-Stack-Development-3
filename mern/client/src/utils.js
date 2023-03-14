import Cookies from 'js-cookie'


const TOKEN_KEY = 'jwt';

export const login = () => Cookies.set(TOKEN_KEY, 'token_key');

export const logout = () => Cookies.remove(TOKEN_KEY);

export const isLoggedIn = () => {
    if (Cookies.get(TOKEN_KEY)) {
        return true;
    }
    return false;
}