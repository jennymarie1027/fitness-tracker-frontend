import React, { useEffect } from 'react';
import { handlePatchingSingleRoutine } from '../../handleFuncs';

const EditRoutine = ({ token, history, selectedRoutine, routineId, updateName, setUpdateName, updateGoal, setUpdateGoal, updateIsPublic, setUpdateIsPublic }) => {

    useEffect(() => {
        setUpdateGoal(selectedRoutine.goal)
        setUpdateIsPublic(selectedRoutine.isPublic)
        setUpdateName(selectedRoutine.name)
    }, [selectedRoutine])

    return (
        <div >
            <form
            className="editRoutineContainer"
                onSubmit={(e) => {
                    e.preventDefault()
                    handlePatchingSingleRoutine(token, routineId, updateName, updateGoal, updateIsPublic)
                    history.push(`/routines/${username}`)
                }}
            >
                <h1>Edit Routine:</h1>
                <label>Edit Routine Name:</label>
                <input
                    type='text'
                    value={updateName}
                    onChange={e => setUpdateName(e.target.value)}
                    id="updateName"
                    className='form-control mb-2 editInput'
                />
                <label>Edit Routine Goal:</label>
                <input
                    type='text'
                    value={updateGoal}
                    onChange={e => setUpdateGoal(e.target.value)}
                    id="updateGoal"
                    className='form-control mb-2 editInput'
                />
                
                <label>Edit if routine is public: </label>
                <input 
                        type="checkbox"
                        value={updateIsPublic}
                        onChange={() => setUpdateIsPublic(!selectedRoutine.isPublic)}
                        id="isPublic"
                />
                <button className="editRoutineBtn btn btn-lg btn-block mt-4">
                    Edit routine
                </button>
            </form>
        </div>
    )
}

export default EditRoutine;