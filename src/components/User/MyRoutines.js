import React, { useState, useEffect } from 'react';
import NewRoutine from './newRoutine';

const MyRoutines = ({myRoutines, setMyRoutines, token}) => {

    return (
        <div>
            <h1>My routines</h1>
            <NewRoutine setMyRoutines={setMyRoutines} myRoutines={myRoutines} token={token} />
            <div>
                {myRoutines.map(routine => (
                    <article key={routine.id}>
                        <div className='routineContainer'>
                            <h3>{routine.name}</h3>
                            <p>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                            <button
                                onClick={() => {
                                    history.push("/myroutines/" + routine.id)
                                }}
                            >Edit this Routine</button>
                        </div>
                    </article>
                    ))
                }
            </div>
        </div>
    )
}

export default MyRoutines;