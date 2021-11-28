import React, { useState, useEffect } from 'react';
import NewRoutine from './newRoutine';
import { handleFetchingUserRoutines } from '../../handleFuncs';

const MyRoutines = ({myRoutines, setMyRoutines, match}) => {

    useEffect(async () => {
        const username = match.params.username
        await handleFetchingUserRoutines(username, setMyRoutines)

    }, [])

    console.log(myRoutines)

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