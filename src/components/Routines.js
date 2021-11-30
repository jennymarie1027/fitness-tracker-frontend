import React, {useEffect} from 'react';
import API_URL from '../constants';
// const {handleFetchingRoutines} = '../handleFuncs.js';

async function handleFetchingRoutines( ){
    try{
        const result = await fetch(`${API_URL}/api/routines`, { headers: { 'Content-Type': "application/json",} } )
        const data= await result.json();
        return data;
    } catch(error){
        throw error;     // use effect is catching this error
    }
}

const Routines = ({ routines, setRoutines}) => {

    console.log("api url is ", API_URL);
    useEffect(         // 
        async ()=> {                  
        const results = await handleFetchingRoutines();     
        setRoutines( results );                 //  update state with posts
    }, []);  

    return (
        <div>
            <h1>Routines</h1>
            {routines.map((routine, index) =>{
                
                return(
                    <div key={routine.id}>
                    <h2>{routine.name}</h2>
                    <p>{routine.description}</p>
                    <p>{routine.duration}</p>
                    <p>{routine.count}</p>
                    <p>{routine.routineId}</p>
                </div>    )
            })}  
        </div>
    )
}

export default Routines;