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
                user: {
                  username: username,
                  password: password
                }
              })
        })
        const parsedData = await res.json();
        const token = parsedData.data.token;
        setToken(token);
        localStorage.setItem('token', token);
    } catch(err) {
        console.error(err);
    }
}

async function handleRegister(username, password, confirmedPassword, setToken){
    try {
        if ((password === confirmedPassword) && (password.length >= minPasswordLength)) {
        const res = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password
              }
            })
          })
        const parsedData = await res.json();
        const token = parsedData.data.token;
        setToken(token);
        localStorage.setItem('token', token);
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

export async function handleFetchingRoutines( ){
    try{
        const result = await fetch(`${API_URL}/api/routines`, { headers: { 'Content-Type': "application/json",} } )
        const data= await result.json();
        return data;
    } catch(error){
        throw error;     // use effect is catching this error
    }
}






export {
    handleHeaders,
    handleRegister,
    handleLogin,
    handleLogout,
    handleFetchingUserInfo,
    handleFetchingRoutines,
}