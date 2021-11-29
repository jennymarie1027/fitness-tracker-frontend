import React, { useState, useEffect } from 'react';
import { handleAddingRoutineActivity } from '../../handleFuncs';

const AddingRoutineActivity = ({userId, updateCount, setUpdateCount, updateDuration, setUpdateDuration}) => {
    
    // useEffect(async () => {
    //     const displayedRoutine = await handleFetchingSingleRoutine(userId, myRoutines)

    //     await setSelectedRoutine(displayedRoutine)
    // }, [])

    return (
        <div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await handleAddingRoutineActivity(userId, activityId, updateCount, updateDuration)
                    }}
                >
                    <h1>Add activity</h1>
                    <input
                        type='text'
                        value={updateCount}
                        onChange={e => setUpdateCount(e.target.value)}
                        id="updateCount"
                    />
                    <input
                        type='text'
                        value={updateDuration}
                        onChange={e => setUpdateDuration(e.target.value)}
                        id="updateDuration"
                    />
                    <button>
                        Add activity
                    </button>
                </form>
        </div>
    )
}

export default AddingRoutineActivity;