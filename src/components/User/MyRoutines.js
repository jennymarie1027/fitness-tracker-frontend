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
                                }}>
                            <h3>{routine.name}</h3>
                            <p>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                            <h2>Activities</h2>
                            {routine.activities ? (routine.activities.map((activity) => (
                                <div>
                                    <h3>{activity.name}</h3>
                                </div>
                            ))) : 
                            (<div>
                                <AddingRoutineActivity routineId={routineId} updateCount={updateCount} activities={activities} setUpdateCount={setUpdateCount} updateDuration={updateDuration} setUpdateDuration={setUpdateDuration}/>
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