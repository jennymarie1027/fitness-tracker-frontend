import React, { useState, useEffect } from 'react';
import { handleFetchingSingleRoutine, handleDeletingSingleRoutine, handleFetchingUserRoutines } from '../../handleFuncs';
import AddingRoutineActivity from './AddingRoutineActivity';
import EditingRoutineActivity from './EditingRoutineActivity';
import EditRoutine from './EditRoutine';

const MySingleRoutine = ({match, history, token, myRoutines, setMyRoutines, selectedRoutine, setSelectedRoutine}) => {
    const [updateName, setUpdateName] = useState('')
    const [updateGoal, setUpdateGoal] = useState('')
    const [updateIsPublic, setUpdateIsPublic] = useState(false)

    const [updateCount, setUpdateCount] = useState(null)
    const [updateDuration, setUpdateDuration] = useState(null)

    const userId = Number(match.params.userId)
    const username = localStorage.getItem('username');

    useEffect(async () => {
        const displayedRoutine = await handleFetchingSingleRoutine(userId, myRoutines)

        await setSelectedRoutine(displayedRoutine)
    }, [])

    useEffect(async () => {
        const fetchedRoutines = await handleFetchingUserRoutines(username, setMyRoutines, token)
        await setMyRoutines(fetchedRoutines)
    }, [])

    console.log('myRoutines inside of mysingleRoutine = ', myRoutines);

    return (
        <div>
            <EditRoutine token={token} selectedRoutine={selectedRoutine} userId={userId} updateName={updateName} setUpdateName={setUpdateName} updateGoal={updateGoal} setUpdateGoal={setUpdateGoal} updateIsPublic={updateIsPublic} setUpdateIsPublic={setUpdateIsPublic} />
            <div style={{marginTop: 5 + 'em'}}>
                <h1>{selectedRoutine.name}</h1>
                <p>{selectedRoutine.goal}</p>
                <p><b>Creator: </b>{selectedRoutine.creatorName}</p>
                <button
                    onClick={() => {
                        handleDeletingSingleRoutine(userId, token)
                        history.push('/myroutines')
                    }}
                >
                    Delete routine
                </button>
                {/* <button
                    onClick={() => {
                        history.push(`/myroutines/${userId}/edit`)
                    }}
                >Edit Routine</button> */}
                <h2>Activities</h2>
                {selectedRoutine.activities ? selectedRoutine.activities.map((activity) => (
                    <div>
                        <h3>{activity.name}</h3>
                    </div>
                )) : 
                    <div>
                        <h3>No activities yet!</h3>
                    </div>
                }
                {/* <EditingRoutineActivity userId={userId} updateCount={updateCount} setUpdateCount={setUpdateCount} updateDuration={updateDuration} setUpdateDuration={setUpdateDuration} /> */}
                {/* <AddingRoutineActivity userId={userId} updateCount={updateCount} setUpdateCount={setUpdateCount} updateDuration={updateDuration} setUpdateDuration={setUpdateDuration}/> */}
            </div>
        </div>
    )
}

export default MySingleRoutine;