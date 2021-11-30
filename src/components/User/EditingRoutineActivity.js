import React, { useState, useEffect } from 'react';
import { handlePatchingRoutineActivity } from '../../handleFuncs';

const EditingRoutineActivity = ({ match, history, token }) => {
    const routineActivityId = Number(match.params.routineActivityId)
    const routineId = Number(match.params.routineId)

    const [updateCount, setUpdateCount] = useState(0)
    const [updateDuration, setUpdateDuration] = useState(0)

    return (
        <div>
                <form
                    className="editRoutineActivityContainer"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await handlePatchingRoutineActivity(routineActivityId, updateCount, updateDuration, token)
                        history.push('/myroutines/' + routineId)
                    }}
                >
                    <h1>Edit activity</h1>
                    <p>New count: </p><input
                        type='text'
                        value={updateCount}
                        onChange={e => setUpdateCount(e.target.value)}
                        id="updateCount"
                        className='form-control mb-2 editInput'
                    />
                    <p>New duration: </p><input
                        type='text'
                        value={updateDuration}
                        onChange={e => setUpdateDuration(e.target.value)}
                        id="updateDuration"
                        className='form-control mb-2 editInput'
                    />
                    <button className="editRoutineActivityBtn btn btn-lg btn-block mt-4">
                        Edit activity
                    </button>
                </form>
        </div>
    )
}

export default EditingRoutineActivity;