import React, { useState, useEffect } from 'react';
import AddingRoutineActivity from './AddingRoutineActivity';
import NewRoutine from './newRoutine';

async function handleFetchingPublicUserRoutines(user){
    try {
        const result = await fetch(`${API_URL}/api/routines`, { headers: { 'Content-Type': "application/json",} } )
        const data= await result.json();

        let userData = []
        
        for(let i=0; i<data.length; i++){
            if(data[i].creatorName === user) userData.push(data[i]);
        }

        console.log(userData)
        return userData
    } catch (error) {
        throw error;
    }
}

const MyRoutines = ({myRoutines, setMyRoutines, token, history, routines, setRoutines}) => {
    
    return (
        <div>
            {token ? 
                <NewRoutine setMyRoutines={setMyRoutines} myRoutines={myRoutines} token={token} />
                : null
            }
            <div className='myRoutinesContainer'>
                {myRoutines.length ? myRoutines.map(routine => (
                    <article key={routine.id} className='mySingleRoutine'>
                        <div
                            className='routineContainer'
                            >
                            <h3>{routine.name}</h3>
                            <p><b>Goal: </b>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                            <h4>Activities</h4>
                            {routine.activities.length ? (routine.activities.map((activity) => (
                                <div className='mySingleActivity' key={activity.id}>
                                    <h5>{activity.name}</h5>
                                    <p>Description: {activity.description}</p>
                                    <p>Count: {activity.count}</p>
                                    <p>Duration: {activity.duration}</p>
                                </div>
                            ))) : (
                                <p>No activities yet!</p>
                            )}
                        </div>
                        <button onClick={() => {
                                    console.log(history)
                                    history.push("/myroutines/" + routine.id)
                                }}>Edit Routine & Activity Details</button>
                    </article>
                    ))
                : <p>You have not made any routines yet!</p>}
            </div>
        </div>
    )
}

export default MyRoutines;