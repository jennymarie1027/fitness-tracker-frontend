import React, { useState, useEffect } from 'react';
import NewRoutine from './newRoutine';

const MyRoutines = ({myRoutines, setMyRoutines, token, history}) => {

    return (
        <div>
            <h1>My routines</h1>
            <NewRoutine setMyRoutines={setMyRoutines} myRoutines={myRoutines} token={token} />
            <div>
                {myRoutines.map(routine => (
                    <article key={routine.id}>
                        <div
                            className='routineContainer'
                            onClick={() => {
                                    history.push("/myroutines/" + routine.id)
                                }}>
                            <h3>{routine.name}</h3>
                            <p>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                            {/* <h2>Activities</h2>
                            {routine.activities ? routine.activities.map((activity) => (
                                <div>
                                    <h3>{activity.name}</h3>
                                </div>
                            )) : 
                            <div>
                                <h3>No activities yet!</h3>
                            </div>} */}
                        </div>
                    </article>
                    ))
                }
            </div>
        </div>
    )
}

export default MyRoutines;