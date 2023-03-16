import Cookies from 'js-cookie'
import { SESSION_TOKEN } from './components/login';

export const logout = () => Cookies.remove(SESSION_TOKEN);

export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:5000/admin/validate_token?token=${SESSION_TOKEN}`, {
          method: "GET",
        })
        .then(response => response.json())
        .then(data => {
          console.log("data.status", data.status, "data.data.valid", data.data.valid, "Cookies.get(SESSION_TOKEN)", Cookies.get(SESSION_TOKEN))
          if (data.status === "ok" && data.data.valid === true/* && Cookies.get(SESSION_TOKEN)*/) {
              console.log('true!!!')
              resolve(true);
          } else {
              console.log('false!!!')
              resolve(false);
          }
        })
    });
};