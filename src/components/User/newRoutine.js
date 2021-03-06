import React, { useState, useEffect } from 'react';
import API_URL from '../../constants';
import { handleFetchingUserRoutines } from '../../handleFuncs';

const NewRoutine = ({setMyRoutines, token, history}) => {
    const [routineName, setRoutineName] = useState('')
    const [routineGoal, setRoutineGoal] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const username = localStorage.getItem('username')

    useEffect(async () => {
        const fetchedRoutines = await handleFetchingUserRoutines(username, setMyRoutines, token)
        setMyRoutines(fetchedRoutines)
    }, [])

    return (
        <div>
            <h2 style={{marginTop: 5 + "em"}}>Add New Routine</h2>
            <form
                className="newRoutineContainer"
                onSubmit={async (e) => {
                    e.preventDefault();
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
                        
                        const data = await response.json();
                        if (data.error) {
                            alert('that routine cannot be added, try a different name')
                            history.push('/newRoutine')
                        }
                        const newRoutineResult = await handleFetchingUserRoutines(username, setMyRoutines, token)
                        setMyRoutines(newRoutineResult);
                        history.push('/myroutines')
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
                        className='form-control mb-2 editInput'
                   />
                
                    <input 
                        type='text'
                        value={routineGoal}
                        onChange={e => setRoutineGoal(e.target.value)}
                        id='routineGoal'
                        required
                        placeholder='Routine Goal'
                        className='form-control mb-2 editInput'
                    />
                
                    <input 
                        type="checkbox"
                        value={isPublic}
                        onChange={e => setIsPublic(true)}
                        id="isPublic"
                    >
                    </input><p>Public</p>
                
                <button className='btn btn-primary m-3'>
                    Submit New Routine
                </button>
            </form>
        </div>
    )
}

export default NewRoutine;