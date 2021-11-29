import React, { useState, useEffect } from 'react';
import { handleFetchingSingleRoutine } from '../../handleFuncs';

const MySingleRoutine = ({match, myRoutines, selectedRoutine, setSelectedRoutine}) => {
    useEffect(async () => {
        const userId = Number(match.params.userId)
        const displayedRoutine = await handleFetchingSingleRoutine(userId, myRoutines)
        console.log("routine is ", displayedRoutine)
        await setSelectedRoutine(displayedRoutine)
    }, [])

    console.log("selected routine is", selectedRoutine)

    return (
        <div>
            <div>
                <h3>{selectedRoutine.name}</h3>
                <p>{selectedRoutine.goal}</p>
                <p><b>Creator: </b>{selectedRoutine.creatorName}</p>
            </div>
        </div>
    )
}

export default MySingleRoutine;