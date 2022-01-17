import React, { useState, useEffect } from 'react';
import AddingRoutineActivity from './AddingRoutineActivity';
import NewRoutine from './newRoutine';

const MyRoutines = ({myRoutines, setMyRoutines, token, history, activities}) => {
    const [routineActivity, setRoutineActivity] = useState("")
    
    return (
        <div className='marginTop'>
            { token ? 
                <button  className='btn btn-primary mb-3 mt-3 newActivity'
                onClick={() => {
                    history.push('/newRoutine');
                    console.log(history)
            }}>Create a New Routine</button>
        : null }
            {/* <h1>My routines</h1> */}
            {/* <NewRoutine setMyRoutines={setMyRoutines} myRoutines={myRoutines} token={token} /> */}
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