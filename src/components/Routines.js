import React, {useEffect} from 'react';
const {API_URL } = '../constants.js';
const {handleFetchingRoutines} = '../handleFuncs.js';

const Routines = ({token, routines, setRoutines}) => {

    useEffect(         // 
        async ()=> {                  
        const results = await handleFetchingRoutines();     
        setRoutines( results );                 //  update state with posts
    }, []);  

    return (
        <div>
            <h1>Routines</h1>
            {routines.map((routine, index) =>{

                return(<div key={routine.id}>
                    <h2>{routine.title}</h2>
                    <p>{routine.description}</p>
                </div>    )

            })}
    
        </div>





    )

}

export default Routines;