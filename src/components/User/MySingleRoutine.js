import React, { useState, useEffect } from 'react';

const MySingleRoutine = ({match}) => {
    useEffect(() => {
        const userId = Number(match.params.userId)
        console.log("ID is ", userId)
    })

    return (
        <div>
            <div><h1>MY SINGLE ROUTINE IS WORKING :))))))))))))))))</h1>
                {/* {myRoutines.map(routine => (
                    <article key={routine.id}>
                        <div className='routineContainer'>
                            <h3>{routine.name}</h3>
                            <p>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                        </div>
                    </article>
                    ))
                } */}
            </div>
        </div>
    )
}

export default MySingleRoutine;