import React, { useState, useEffect } from 'react';
import { handlePatchingRoutineActivity } from '../../handleFuncs';

const EditingRoutineActivity = ({ match, history, token, username }) => {
    const routineActivityId = Number(match.params.routineActivityId)
    const routineId = Number(match.params.routineId)

    const [updateCount, setUpdateCount] = useState(0)
    const [updateDuration, setUpdateDuration] = useState(0)

    return (
        <div>
                <form
                    style={{marginTop: 5 + "em"}}
                    className="editRoutineActivityContainer"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const res = await handlePatchingRoutineActivity(routineActivityId, updateCount, updateDuration, token);
                        console.log(res);
                        history.push(`/routines/${username}/` + routineId)
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