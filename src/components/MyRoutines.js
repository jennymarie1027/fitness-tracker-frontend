import React, { useState, useEffect } from 'react';
const { API_URL } = '../constants.js';

const MyRoutines = ({isLoggedIn}) => {
    const [routineName, setRoutineName] = useState('')
    const [routineGoal, setRoutineGoal] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [myRoutines, setMyRoutines] = useState([])

    return (
        <div>
            <h1>My routines</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();

                    try {
                        const response = await fetch(
                            API_URL + '/api/routines',
                        {
                            method: "POST",
                            body: JSON.stringify({
                                routineName,
                                routineGoal,
                                isPublic
                            })
                        })
                        
                        const result = await response.json();
                        setMyRoutines([
                            ...myRoutines,
                            result.data.name
                        ])
                    } catch (error) {
                        console.error(error)
                    }
                }}
            >
                {/* <div><h2>Add New Routine</h2></div> */}
                <div>
                   <input 
                        type='text'
                        value={routineName}
                        onChange={e => setRoutineName(e.target.value)}
                        id='routineName'
                        required
                        placeholder='Routine Name'
                   />
                </div>
                <div>
                    <input 
                        type='text'
                        value={routineGoal}
                        onChange={e => setRoutineGoal(e.target.value)}
                        id='routineGoal'
                        required
                        placeholder='Routine Goal'
                    />
                </div>
                <div>
                    <input 
                        type="checkbox"
                        value={isPublic}
                        onChange={e => setIsPublic(e.target.value)}
                        id="isPublic"
                        required
                    >
                        {/* <p>Public</p> */}
                    </input>
                </div>
                <button type='submit' value='Submit'>
                    <label>Submit New Routine</label>
                </button>
            </form>
        </div>
    )
}

export default MyRoutines;