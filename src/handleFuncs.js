// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------** the functions below are pasted from stranger's things, they seem like a good start to handling whether a user is logged in or not for fitness tracker ** --------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { API_URL } from './constants.js';

function handleHeaders(token) {
    let header;
    if (token) {
        header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }      
    } else {
        header = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    return header;
}


const handleLogout = () => {
    localStorage.removeItem('token')
}

async function handleLogin(username, password, setToken){
    try {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                  username: username,
                  password: password
              })
        })
        const parsedData = await res.json();
        // const token = parsedData.data.token;
        // setToken(token);
        // localStorage.setItem('token', token);
        return parsedData;
    } catch(err) {
        console.error(err);
    }
}

async function handleRegister(username, password, confirmedPassword){
    try {
        if ((password === confirmedPassword) && (password.length >= 8)) {
        const res = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
          })
        const parsedData = await res.json();
        // const token = parsedData.data.token;
        // setToken(token);
        // localStorage.setItem('token', token);
        return parsedData;
        } else {
          alert(`Please make sure your passwords match and are at least ${minPasswordLength} characters long`)
        } 
    } catch(err) {
        console.error(err);
    } 
}

async function handleFetchingUserInfo(token) {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await res.json();
        return data;
    } catch(err) {
      console.error(err);
    }
}

const handleFetchingActivities = async (token) => {
    if (!token) {
        try {
            const res = await fetch(`${API_URL}/api/activities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
            const data = await res.json();
            return data
        } catch(err) {
            console.error(err);
        }
    } else if (token) {
        try {
            const res = await fetch(`${API_URL}/activities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            } );
            const data = await res.json();
            return data
        } catch(err) {
            console.error(err);
        }
    }
   
}

export {
    handleHeaders,
    handleRegister,
    handleLogin,
    handleLogout,
    handleFetchingUserInfo,
    handleFetchingActivities,
}