import React, { useState, useEffect } from 'react';
import { handleFetchingSingleRoutine, handleDeletingSingleRoutine, handleDeletingRoutineActivity } from '../../handleFuncs';
import AddingRoutineActivity from './AddingRoutineActivity';
import EditRoutine from './EditRoutine';

const MySingleRoutine = ({
    match, history, token, myRoutines, selectedRoutine, setSelectedRoutine, routineId, setRoutineId, }) => {

    useEffect(() => {
        setRoutineId(Number(match.params.routineId));
    }, [])

    
    useEffect(async () => {
        const displayedRoutine = await handleFetchingSingleRoutine(routineId, myRoutines)
        setSelectedRoutine(displayedRoutine)
    }, [myRoutines, routineId])

    return (
        <div className='marginTop'>
            <div className='singleRoutineDetailsContainer'>
                <h1>{selectedRoutine.name} Routine Details</h1>
                <div className='singleRoutineDetails'>
                    <p><b>Goal:</b> {selectedRoutine.goal}</p>
                    <p><b>Created By: </b>{selectedRoutine.creatorName}</p>
                    <p><b>Routine Public: </b>{selectedRoutine.isPublic === true ? 'Yes' : "No"}</p>
                </div>
                <button
                    onClick={() => {
                        handleDeletingSingleRoutine(routineId, token)
                        history.push('/myroutines')
                    }}
                >
                    Delete routine
                </button>
                <button
                    onClick={() => {
                        history.push('/editRoutine/' + routineId)
                    }}
                >
                    Edit routine
                </button>
                <button
                    onClick={() => {
                        history.push('/addRoutineActivity/' + routineId)
                    }}
                >
                    Add activity
                </button>

            </div>
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
                <p>This routine does not have any activities yet!</p>
                )
            }
            {/* <AddingRoutineActivity history={history} token={token} routineId={routineId} updateCount={updateCount} activities={activities} setUpdateCount={setUpdateCount} updateDuration={updateDuration} setUpdateDuration={setUpdateDuration}/> */}
        </div>
    )
}

export default MySingleRoutine;