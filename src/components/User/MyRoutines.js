import React, { useState, useEffect } from 'react';
import NewRoutine from './newRoutine';
import { handleFetchingUserRoutines } from '../../handleFuncs';
const { API_URL } = '../constants.js';

const MyRoutines = ({isLoggedIn, routines, match}) => {
    const [myRoutines, setMyRoutines] = useState([])

    useEffect(() => {
        const username = match.params.username
        console.log(username)

        // const fetchedUserRoutines = handleFetchingUserRoutines(username)
        async function handleFetchingUserRoutines(username) {
            fetch(`${API_URL}users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
            .then(result => {
                console.log("HANDLE FETCHING USER ROUTINES HAS FIRED:", result)
                return result;
            })
            .catch(console.error);
        }
        const fetchedUserRoutines = handleFetchingUserRoutines(username)
        setMyRoutines(fetchedUserRoutines)
        console.log(fetchedUserRoutines)
        console.log(myRoutines)

        return myRoutines
    }, [])

    return (
        <div>
            <h1>My routines</h1>
            <NewRoutine setMyRoutines={setMyRoutines} />
            <div>
                {myRoutines.map(routine => (
                    <article key={routine.id}>
                        <div className='routineContainer'>
                            <h3>{routine.name}</h3>
                            <p>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                        </div>
                    </article>
                    ))
                }
            </div>
        </div>
    )
}

export default MyRoutines;