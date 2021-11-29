import React, { useState, useEffect } from 'react';
import API_URL from '../../constants';
import { handleFetchingUserRoutines } from '../../handleFuncs';

const NewRoutine = ({setMyRoutines, token, myRoutines}) => {
    const [routineName, setRoutineName] = useState('')
    const [routineGoal, setRoutineGoal] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const username = localStorage.getItem('username')

    useEffect(async () => {
        console.log('Use effect has fired')
        const fetchedRoutines = await handleFetchingUserRoutines(username, setMyRoutines, token)
        await setMyRoutines(fetchedRoutines)
    }, [])

    return (
        <div>
            <h2>Add New Routine</h2>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("Form submitted")

                    try {
                        const response = await fetch(
                            API_URL + '/api/routines',
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify({
                                name: routineName,
                                goal: routineGoal,
                                isPublic: isPublic
                            })
                        })
                        
                        const result = await response.json();
                        const newRoutineResult = await handleFetchingUserRoutines(username, setMyRoutines, token)
                        
                        console.log("API call result is", newRoutineResult)
                    } catch (error) {
                        console.error(error)
                    }
                }}
            >                
                   <input 
                        type='text'
                        value={routineName}
                        onChange={e => setRoutineName(e.target.value)}
                        id='routineName'
                        required
                        placeholder='Routine Name'
                   />
                
                    <input 
                        type='text'
                        value={routineGoal}
                        onChange={e => setRoutineGoal(e.target.value)}
                        id='routineGoal'
                        required
                        placeholder='Routine Goal'
                    />
                
                    <input 
                        type="checkbox"
                        value={isPublic}
                        onChange={e => setIsPublic(true)}
                        id="isPublic"
                    >
                    </input>
                
                <button>
                    Submit New Routine
                </button>
            </form>
        </div>
    )
}

export default NewRoutine;