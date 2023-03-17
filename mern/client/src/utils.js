// import Cookies from 'js-cookie'
// import { SESSION_TOKEN } from './components/login';



// const cookies = Cookies.get();
// Object.keys(cookies).forEach(key => {
//     if (cookies[key] === 'token_key') {
//       console.log(key);
//       SESSION_TOKEN = key
//     }
//   });


export const logout = () => {
    // Object.keys(cookies).forEach(key => {
    //     if (cookies[key] === 'token_key') {
    //       console.log(key);
    //       SESSION_TOKEN = key
    //     }
    //   });    
    // Cookies.remove(SESSION_TOKEN)
  };

// export const isLoggedIn = async () => {
//   const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
//     // Object.keys(cookies).forEach(key => {
//     //     if (cookies[key] === 'token_key') {
//     //       console.log(key);
//     //       SESSION_TOKEN = key
//     //     }
//     //   });
//     const SESSION_TOKEN = cookies.token_key
//     console.log("SESSION_TOKEN", SESSION_TOKEN)
//       return new Promise((resolve, reject) => {
//       fetch(`http://localhost:5000/admin/validate_token?token=${SESSION_TOKEN}`, {
//           method: "GET",
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//           if (data.status === "ok" && data.data.valid === true && cookies.token_key) {
//               resolve(true);
//           } else {
//               resolve(false);
//           }
//         })
//     });
// };