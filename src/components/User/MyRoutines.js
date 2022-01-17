import React, { useState, useEffect } from 'react';
import { handleFetchingPublicUserRoutines } from '../../handleFuncs';

const MyRoutines = ({mappedRoutines, setMappedRoutines, myRoutines, token, history, username, match, publicRoutines, setPublicRoutines}) => {
    useEffect(() => {
        async function userPublicRoutines() {                  
            const results = await handleFetchingPublicUserRoutines(match.params.username)
            setPublicRoutines(results)   
            setMappedRoutines(results)         
            
            return results
        }
        if(myRoutines.length === 0){ 
            userPublicRoutines();
        } else setMappedRoutines(myRoutines)
    }, []); 

    console.log("PUBLIC ROUTINES ", publicRoutines)
    console.log("MAPPED ROUTINES ", mappedRoutines)
    return (
        <div className='marginTop'>
            { token ? 
                <button  className='btn btn-primary m-3'
                onClick={() => {
                    history.push('/newRoutine');
                    console.log(history)
            }}>Create a New Routine</button>
        : null }
            <div className='myRoutinesContainer'>
                {mappedRoutines.length ? mappedRoutines.map(routine => (
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
                        <button  className='btn btn-primary m-3'
                        onClick={() => {
                                    console.log(history)
                                    history.push(`/routines/${username}/` + routine.id)
                                }}>Edit Routine & Activity Details</button>
                    </article>
                    ))
                : <p>You have not made any routines yet!</p>}
            </div>
        </div>
    )
}

export default MyRoutines;