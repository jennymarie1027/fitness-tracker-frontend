import React, { useState, useEffect } from 'react';
import { handleFetchingSingleRoutine, handleDeletingSingleRoutine } from '../../handleFuncs';
import AddingRoutineActivity from './AddingRoutineActivity';
import EditingRoutineActivity from './EditingRoutineActivity';
import EditRoutine from './EditRoutine';

const MySingleRoutine = ({match, history, token, myRoutines, selectedRoutine, setSelectedRoutine, activities}) => {

    const [updateName, setUpdateName] = useState('')
    const [updateGoal, setUpdateGoal] = useState('')
    const [updateIsPublic, setUpdateIsPublic] = useState(false)

    const [updateCount, setUpdateCount] = useState(0)
    const [updateDuration, setUpdateDuration] = useState(0)

    const routineId = Number(match.params.routineId)

    
    useEffect(async () => {
        const displayedRoutine = await handleFetchingSingleRoutine(routineId, myRoutines)

        await setSelectedRoutine(displayedRoutine)
    }, [])

    return (
        <div>
            {/* <EditRoutine token={token} selectedRoutine={selectedRoutine} routineId={routineId} updateName={updateName} setUpdateName={setUpdateName} updateGoal={updateGoal} setUpdateGoal={setUpdateGoal} updateIsPublic={updateIsPublic} setUpdateIsPublic={setUpdateIsPublic} /> */}
            <div>
                <h1>{selectedRoutine.name}</h1>
                <p>{selectedRoutine.goal}</p>
                <p><b>Creator: </b>{selectedRoutine.creatorName}</p>
                <button
                    onClick={() => {
                        handleDeletingSingleRoutine(routineId, token)
                        history.push('/myroutines')
                    }}
                >
                    Delete routine
                </button>
                <h2>Activities</h2>
                {selectedRoutine.activities ? (selectedRoutine.activities.map((activity) => (
                    <div>
                        <h3>{activity.name}</h3>
                    </div>
                ))) : 
                    (<div>
                        <h3>No activities yet!</h3>
                    </div>)
                }
                <AddingRoutineActivity routineId={routineId} updateCount={updateCount} activities={activities} setUpdateCount={setUpdateCount} updateDuration={updateDuration} setUpdateDuration={setUpdateDuration}/>
            </div>
        </div>
    )
}

export default MySingleRoutine;