import React, { useState, useEffect } from 'react';
import { handlePatchingSingleRoutine, handleFetchingSingleRoutine } from '../../handleFuncs';

const EditRoutine = ({ token, selectedRoutine, routineId, updateName, setUpdateName, updateGoal, setUpdateGoal, updateIsPublic, setUpdateIsPublic, myRoutines, setSelectedRoutine }) => {
    
    useEffect(async () => {
        const displayedRoutine = await handleFetchingSingleRoutine(routineId, myRoutines)
        await setSelectedRoutine(displayedRoutine)
    }, [])

    console.log('selectedRoutine = ', selectedRoutine)

    return (
        <div>
            <h1>EDIT ROUTINE COMPONENT</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handlePatchingSingleRoutine(token, routineId, updateName, updateGoal, updateIsPublic)
                }}
            >
                <h1>Edit Routine</h1>
                <label>Edit Routine Name:</label>
                <input
                    type='text'
                    value={updateName}
                    onChange={e => setUpdateName(e.target.value)}
                    placeholder={selectedRoutine.name}
                    id="updateName"
                />
                <label>Edit Routine Goal</label>
                <input
                    type='text'
                    value={updateGoal}
                    onChange={e => setUpdateGoal(e.target.value)}
                    placeholder={selectedRoutine.goal}
                    id="updateGoal"
                />
                
                <label>Edit if routine is public: </label>
                <input 
                        type="checkbox"
                        value={updateIsPublic}
                        onChange={() => setUpdateIsPublic(!selectedRoutine.isPublic)}
                        id="isPublic"
                />
                <br/>
                <button>
                    Edit routine
                </button>
            </form>
        </div>
    )
}

export default EditRoutine;