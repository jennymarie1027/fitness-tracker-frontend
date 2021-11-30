import React, { useState, useEffect } from 'react';
import { handlePatchingRoutineActivity } from '../../handleFuncs';

const EditingRoutineActivity = ({ routineId, updateDuration, setUpdateDuration, updateCount, setUpdateCount }) => {
    const routineActivityId = Number(match.params.routineActivityId)
    // useEffect(async () => {
    //     const displayedRoutine = await handleFetchingSingleRoutine(routineId, myRoutines)

    //     await setSelectedRoutine(displayedRoutine)
    // }, [])

    return (
        <div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await handlePatchingRoutineActivity(routineActivityId, updateCount, updateDuration)
                    }}
                >
                    <h1>Edit activity</h1>
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
                        Edit activity
                    </button>
                </form>
        </div>
    )
}

export default EditingRoutineActivity;