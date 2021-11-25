// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------** the functions below are pasted from stranger's things, they seem like a good start to handling whether a user is logged in or not for fitness tracker ** --------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TO DO ---console.log these functions and make sure they are firing 

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
        const res = await fetch(`${API_URL}/api/users/login`, {
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
        const token = parsedData.token;
        setToken(token);
        console.log("HANDLE LOGIN HAS FIRED")

        localStorage.setItem('token', token);
        return parsedData;
    } catch(err) {
        console.error(err);
    }
}

async function handleRegister(username, password, setToken){
    try {
        if (password.length >= 8) {
        const res = await fetch(`${API_URL}/api/users/register`, {
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
        const token = parsedData.token;
        setToken(token);
        localStorage.setItem('token', token);
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

async function handleFetchingActivities()  {
    fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(console.error);
  }

  async function handleFetchingUserRoutines(username) {
      console.log("HANDLE FETCHED USER ROUTINES FIRED")
    // fetch(`${API_URL}users/${username}/routines`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // }).then(response => response.json())
    // .then(result => {
    //     console.log("HANDLE FETCHING USER ROUTINES HAS FIRED:", result)
    //     return result;
    // })
    // .catch(console.error);
}

export {
    handleHeaders,
    handleRegister,
    handleLogin,
    handleLogout,
    handleFetchingUserInfo,
    handleFetchingActivities,
    handleFetchingUserRoutines
}