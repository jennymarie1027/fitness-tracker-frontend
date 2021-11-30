import React, { useState, useEffect } from 'react';
import { handleFetchingSingleRoutine, handleFetchingUserRoutines } from '../../handleFuncs';

const EditRoutine = ({ match, token, selectedRoutine, myRoutines, setMyRoutines,setSelectedRoutine }) => {
    // const username = localStorage.getItem('username');


    // useEffect(async () => {
    //     const fetchedRoutines = await handleFetchingUserRoutines(username, setMyRoutines, token)
    //     await setMyRoutines(fetchedRoutines)
    // }, [])

    

    // useEffect(async () => {
    //         const displayedRoutine = await handleFetchingSingleRoutine(userId, myRoutines);
            
    //         setSelectedRoutine(displayedRoutine)
        
    // }, [myRoutines])



    return (
        <div>
            <h1 style={{marginTop: 5 + 'em'}}>EDITING MY SINGLE ROUTINE!! :)</h1>
            {/* <form
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
         
            </form> */}
        </div>
    )
}

export default EditRoutine;