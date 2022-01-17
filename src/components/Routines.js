import React, {useEffect} from 'react';
import API_URL from '../constants';
import { handleFetchingPublicUserRoutines } from '../handleFuncs';
// const {handleFetchingRoutines} = '../handleFuncs.js';

async function handleFetchingRoutines( ){
    try{
        const result = await fetch(`${API_URL}/api/routines`, { headers: { 'Content-Type': "application/json",} } )
        const data= await result.json();
        return data;
    } catch(error){
        throw error;
    }
}

const Routines = ({ routines, setRoutines, setMyRoutines}) => {

    useEffect(
        async ()=> {                  
        const results = await handleFetchingRoutines();     
        setRoutines( results );
    });

    return (
        <div>
            <div className='marginTop'>Routines</div>
            {routines.map((routine) =>{
                return(
                    <div key={routine.id} className='singleRoutine'>
                    <h2>{routine.name}</h2>
                    <p>Routine Goal: {routine.goal}</p>
                    <p>Created By: <a href={`/routines/${routine.creatorName}`}>{routine.creatorName}</a></p>
                    <div className='activitiesContainer'>
                    {routine.activities.length ? (
                             routine.activities.map(activity => (
                                 <div className='singleActivity' key={activity.id}>
                                    <p>Activity Title {activity.name}</p> 
                                    <p>Description: {activity.description}</p>
                                    <p>Duration: {activity.duration}</p>
                                    <p>Count: {activity.count}</p>
                                </div>
                             ))
                    ) : <p>This Routine Does Not Have Any Activities Yet...</p>}
                    </div>
                </div>)
            })}  
        </div>
    )
}

export default Routines;