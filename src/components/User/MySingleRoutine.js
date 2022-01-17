import React, { useState, useEffect } from 'react';
import { handleFetchingSingleRoutine, handleDeletingSingleRoutine, handleDeletingRoutineActivity } from '../../handleFuncs';
import AddingRoutineActivity from './AddingRoutineActivity';
import EditRoutine from './EditRoutine';

const MySingleRoutine = ({
    match, history, token, myRoutines, selectedRoutine, setSelectedRoutine, routineId, setRoutineId, username }) => {

    useEffect(() => {
        setRoutineId(Number(match.params.routineId));
    }, [])

    console.log('selectedRoutine = ', selectedRoutine);
    
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
                <div className='singleRoutineBtns'>
                    <button className='btn btn-primary m-3'
                        onClick={() => {
                            handleDeletingSingleRoutine(routineId, token)
                            history.push('/myroutines')
                        }}
                    >
                        Delete routine
                    </button>
                    <button className='btn btn-primary m-3'
                        onClick={() => {
                            history.push('/editRoutine/' + routineId)
                        }}
                    >
                        Edit routine
                    </button>
                    <button className='btn btn-primary m-3'
                        onClick={() => {
                            history.push('/addRoutineActivity/' + routineId)
                        }}
                    >
                        Add activity
                    </button>
                </div>
            </div>
            <h2>{selectedRoutine ? selectedRoutine.name : 'no selected routine'} Activities:</h2>
            {selectedRoutine.activities ? (
                selectedRoutine.activities.map((activity) => (
                    <div key={activity.id}>
                        <hr />
                        <h3>{activity.name}</h3>
                        <p>Description: {activity.description}</p>
                        <p>Count: {activity.count}</p>
                        <p>Duration: {activity.duration}</p>
                        <button className='btn btn-primary m-3'
                            onClick={() => {
                                console.log('activity = ', activity)
                                history.push(`/routines/${username}/` + routineId + "/" + activity.routineActivityId)
                            }}
                        >Edit Activity</button>
                        <button className='btn btn-primary m-3'
                            onClick={() => {
                                handleDeletingRoutineActivity(activity.routineActivityId, token)
                                history.push(`/routines/${username}`)
                            }}
                        >Delete Activity</button>
                    </div>
            ))) : <p>This routine does not have any activities yet.  Add one above.</p> }
        </div>
    )
}

export default MySingleRoutine;