import React, { useState, useEffect } from 'react';
import { handleFetchingSingleRoutine, handleDeletingSingleRoutine, handleDeletingRoutineActivity } from '../../handleFuncs';
import AddingRoutineActivity from './AddingRoutineActivity';
import EditRoutine from './EditRoutine';

const MySingleRoutine = ({match, history, token, myRoutines, selectedRoutine, setSelectedRoutine, activities}) => {

    const [updateName, setUpdateName] = useState('')
    const [updateGoal, setUpdateGoal] = useState('')
    const [updateIsPublic, setUpdateIsPublic] = useState(false)

    const [updateCount, setUpdateCount] = useState(0)
    const [updateDuration, setUpdateDuration] = useState(0)
    const [routineId, setRoutineId] = useState(Number(match.params.routineId))

    
    useEffect(async () => {
        const displayedRoutine = await handleFetchingSingleRoutine(routineId, myRoutines)
        setSelectedRoutine(displayedRoutine)
    }, [myRoutines])

    return (
        <div className='marginTop'>
                <h1>{selectedRoutine.name} Routine Details</h1>
                <p><b>Goal:</b> {selectedRoutine.goal}</p>
                <p><b>Created By: </b>{selectedRoutine.creatorName}</p>
                <p><b>Routine Public: </b>{selectedRoutine.isPublic === true ? 'Yes' : "No"}</p>
                <button
                    onClick={() => {
                        handleDeletingSingleRoutine(routineId, token)
                        history.push('/myroutines')
                    }}
                >
                    Delete routine
                </button>
                
                <h2>Activities:</h2>
                {selectedRoutine.activities ? (
                    selectedRoutine.activities.map((activity) => (
                        <div key={activity.id}>
                        <hr />
                        <h3>{activity.name}</h3>
                        <p>Description: {activity.description}</p>
                        <p>Count: {activity.count}</p>
                        <p>Duration: {activity.duration}</p>
                        <button
                            onClick={() => {
                                console.log('activity = ', activity)
                                history.push("/myroutines/" + routineId + "/" + activity.routineActivityId)
                            }}
                        >Edit Activity</button>

                        {/* NOTE: refresh page not working (all activities disappear) 
                            --the activity will be deleted
                        */}
                        <button
                            onClick={() => {
                                handleDeletingRoutineActivity(activity.routineActivityId, token)
                                history.push("/myroutines/")
                            }}
                        >Delete Activity</button>
                </div>
                ))) : 
                (
                    <p>No activities yet! Add one below.</p>
                    )
                }
                <EditRoutine history={history} token={token} selectedRoutine={selectedRoutine} routineId={routineId} updateName={updateName} setUpdateName={setUpdateName} updateGoal={updateGoal} setUpdateGoal={setUpdateGoal} updateIsPublic={updateIsPublic} setUpdateIsPublic={setUpdateIsPublic} />
                <AddingRoutineActivity history={history} token={token} routineId={routineId} updateCount={updateCount} activities={activities} setUpdateCount={setUpdateCount} updateDuration={updateDuration} setUpdateDuration={setUpdateDuration}/>
        </div>
    )
}

export default MySingleRoutine;