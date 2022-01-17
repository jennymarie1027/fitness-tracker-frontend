import React, { useState, useEffect } from 'react';
import { handleAddingRoutineActivity } from '../../handleFuncs';

const AddingRoutineActivity = ({token, routineId, updateCount, setUpdateCount, updateDuration, setUpdateDuration, activities}) => {
    const [activityId, setActivityId] = useState(null)
    
    return (
        <div>
                <form
                    
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const data = await handleAddingRoutineActivity(routineId, activityId, updateCount, updateDuration, token);
                        if (data.error) {
                            alert('that activity already exists on this routine');
                            setUpdateCount('');
                            setUpdateDuration('');
                        } 
                        else {
                            history.push('/myroutines');
                        }

                    }}
                >
                    <h1>Add activity</h1>
                    <div>
                        <label>Choose an activity: </label>
                        <select 
                            name="activities" 
                            id="activities" 
                            required 
                            onClick={(e) => {
                                e.preventDefault();
                                setActivityId(e.target.value)
                            }}>
                            {activities.map(activity => (
                                <option value={activity.id} key={activity.id}>
                                    {activity.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Count: </label>
                        <input
                            type='number'
                            value={updateCount}
                            onChange={e => setUpdateCount(e.target.value)}
                            id="updateCount"
                            placeholder="Count"
                        />
                    </div>
                    <div>
                        <label>Duration: </label>
                        <input
                            type='number'
                            value={updateDuration}
                            onChange={e => setUpdateDuration(e.target.value)}
                            id="updateDuration"
                            placeholder="Duration"
                        />
                    </div>
                    <button>
                        Add activity
                    </button>
                </form>
        </div>
    )
}

export default AddingRoutineActivity;