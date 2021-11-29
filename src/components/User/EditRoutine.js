import React, { useState, useEffect } from 'react';
import { handlePatchingSingleRoutine } from '../../handleFuncs';

const EditRoutine = ({ token, selectedRoutine, userId, updateName, setUpdateName, updateGoal, setUpdateGoal, updateIsPublic, setUpdateIsPublic }) => {
    
    // useEffect(async () => {
    //     const displayedRoutine = await handleFetchingSingleRoutine(userId, myRoutines)

    //     await setSelectedRoutine(displayedRoutine)
    // }, [])

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handlePatchingSingleRoutine(token, userId, updateName, updateGoal, updateIsPublic)
                }}
            >
                <h1>Edit Routine</h1>
                <input
                    type='text'
                    value={updateName}
                    onChange={e => setUpdateName(e.target.value)}
                    placeholder={selectedRoutine.name}
                    id="updateName"
                />
                <input
                    type='text'
                    value={updateGoal}
                    onChange={e => setUpdateGoal(e.target.value)}
                    placeholder={selectedRoutine.goal}
                    id="updateGoal"
                />
                <br/>
                <input 
                        type="checkbox"
                        value={updateIsPublic}
                        onChange={e => setUpdateIsPublic(true)}
                        id="isPublic"
                /><p>Public</p>
                <button>
                    Edit routine
                </button>
            </form>
        </div>
    )
}

export default EditRoutine;