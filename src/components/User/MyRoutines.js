import React, { useState, useEffect } from 'react';
import AddingRoutineActivity from './AddingRoutineActivity';
import NewRoutine from './newRoutine';

const MyRoutines = ({myRoutines, setMyRoutines, token, history, activities}) => {
    const [routineActivity, setRoutineActivity] = useState("")
    
    return (
        <div>
            <h1>My routines</h1>
            <NewRoutine setMyRoutines={setMyRoutines} myRoutines={myRoutines} token={token} />
            <div>
                {myRoutines && myRoutines.map(routine => (
                    <article key={routine.id}>
                        <div
                            className='routineContainer'
                            onClick={() => {
                                    history.push("/myroutines/" + routine.id)
                                    setRoutineActivity(routine.id)
                                }}>
                            <h3>{routine.name}</h3>
                            <p>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                            <h2>Activities</h2>
                            {routine.activities ? (routine.activities.map((activity) => (
                                <div>
                                    <h3>{activity.name}</h3>
                                    <p>Description: {activity.description}</p>
                                    <p>Count: {activity.count}</p>
                                    <p>Duration: {activity.duration}</p>
                                </div>
                            ))) : 
                            (<div>
                                <p>Click on a routine to add an activity!</p>
                            </div>)}
                        </div>
                    </article>
                    ))
                }
            </div>
        </div>
    )
}

export default MyRoutines;