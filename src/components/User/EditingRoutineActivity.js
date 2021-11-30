import React, { useState, useEffect } from 'react';
import { handlePatchingRoutineActivity } from '../../handleFuncs';

const EditingRoutineActivity = ({ routineId, match, updateDuration, setUpdateDuration, updateCount, setUpdateCount }) => {
    const routineActivityId = Number(match.params.routineActivityId)

    return (
        <div>
                <form
                    style={{marginTop: 5 + "em"}}
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