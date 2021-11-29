// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------** the functions below are pasted from stranger's things, they seem like a good start to handling whether a user is logged in or not for fitness tracker ** --------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import API_URL from './constants.js';

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
    localStorage.removeItem('username')
}

async function handleLogin(username, password, setToken, setUsername, setPassword){
    try {
        console.log('making fetch request...')
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
        console.log(parsedData)
        if (parsedData.token) {
            const token = parsedData.token;
            const username = parsedData.user.username
            setToken(token);
            localStorage.setItem('token', token);
            setUsername(username)
            localStorage.setItem('username', username)
            return parsedData;
        } else {
            alert(parsedData.error)
            setUsername('');
            setPassword('');
        }
    } catch(err) {
        console.error(err);
    }
}

async function handleRegister(username, password, setToken, setUsername, setPassword, setConfirmedPassword){
    try {
        if (password.length >= 8) {
            const res = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
        const parsedData = await res.json();
        console.log('parsedData = ', parsedData);
          if (parsedData.token) {
            const token = parsedData.token;
            const username = parsedData.user.username
            setToken(token);
            localStorage.setItem('token', token);
            setUsername(username)
            localStorage.setItem('username', username)
            return parsedData;
          } else {
              alert(parsedData.error)
              setUsername('')
              setPassword('')
              setConfirmedPassword('')
          }
        } else {
          alert(`Please make sure your passwords match and are at least 8 characters long`)
        } 
    } catch(err) {
        console.error(err);
    } 
}

async function handleFetchingUserInfo(token) {
    try {
        const res = await fetch(`${API_URL}/api/users/me`, {
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


// async function handleFetchingRoutines( ){
//     try{
//         const result = await fetch(`${API_URL}/api/routines`, { headers: { 'Content-Type': "application/json",} } )
//         const data= await result.json();
//         return data;
//     } catch(error){
//         throw error;     // use effect is catching this error
//     }
// }


async function handleFetchingActivities()  {
    try {
        const res = await fetch(`${API_URL}/api/activities`, {
                headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        return data
    }
    catch (error) {
        (console.error);
    }
  }

  async function handleFetchingUserRoutines(username, setMyRoutines, token) {
    try {
        const result = await fetch(`${API_URL}/api/users/${username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
    
        const data = await result.json();
        console.log("Fetching user routines successful")
        console.log("data from handle funcs is ", data)
        setMyRoutines(data)
        return data;
    } catch (error) {
        console.error(error)
    }
    
}

async function handleFetchingSingleRoutine(userId, myRoutines){
    const myRoutine = myRoutines.find((routine) => {
        return routine.id === userId;
    });
    return myRoutine || {};
}

async function handlePatchingSingleRoutine(token, userId, updateName, updateGoal) {
    try {
        const result = await fetch(`${API_URL}/api/routines/${userId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: updateName,
                goal: updateGoal
            })
        })

        const data = await result.json()
        console.log("edited routine is", data)
    } catch (error) {
        
    }
}

async function handleDeletingSingleRoutine(userId, token){
    try {
        const result = await fetch(
            `${API_URL}/api/routines/${userId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        )
    
        const data = await result.json();
        console.log("DELETED routine is", data) 
    } catch (error) {
        console.error(error)
    }
}

async function handleAddingRoutineActivity(userId, activityId, updateCount, updateDuration){
    try {
        const result = await fetch(`${API_URL}/api/routines/${userId}/activities`, {
            method: "POST", 
            body: JSON.stringify({
                activityId: activityId,
                count: updateCount,
                duration: updateDuration
            })
        })

        const data = await result.json();
        console.log("added activity is", data)
    } catch (error) {
        
    }
}

async function handlePatchingRoutineActivity(activityId, activityId, updateCount, updateDuration){
    try {
        const result = await fetch(`${API_URL}/api/api/routine_activities/${activityId}`, {
            method="PATCH",
            body: JSON.stringify({
                count: updateCount,
                duration: updateDuration
            })
        })

        const data = await result.json();
        console.log("added activity is", data)
    } catch (error) {
        
    }
}


export {
    handleHeaders,
    //User endpoints
    handleRegister,
    handleLogin,
    handleLogout,
    handleFetchingUserInfo,
    //Public Activities
    handleFetchingActivities,
    //Public Routines
    //User Routines
    // handleFetchingRoutines,
    handleFetchingUserRoutines,
    handleFetchingSingleRoutine,
    handleDeletingSingleRoutine,
    handlePatchingSingleRoutine,
    //Routine Activities 
    handleAddingRoutineActivity,
    handlePatchingRoutineActivity
}