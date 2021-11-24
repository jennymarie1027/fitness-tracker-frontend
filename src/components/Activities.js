import React, { useState, useEffect } from 'react'
const { API_URL } = '../constants.js';
const { handleFetchingActivities } = '../handleFuncs.js'



const Activities = ({ token, activities }) => {
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    
    return (
        <main style={{marginLeft: 2+'em'}}>
        <h1>Activities Component</h1> 
        <h2>Create A New Activity:</h2>
        <form onSubmit={async (e) => {
            e.preventDefault();
            try {
                const res = await fetch(`${API_URL}/api/activities`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                      },
                    body: JSON.stringify({
                      name: name,
                      description: description
                    })
                })
                const data = await res.json();
                return data;
            } catch (err) {
                console.error(err)
            }
            // handleNewActivitySubmit(name, description)
            // const data = await handleFetchingActivities
            // setActivities(data);
            // setName('')
            // setDescription('')
        }}>
        <div>
            <label>Name:</label>
            <input 
                id='name'
                type='text'
                placeholder='enter activity name'
                required
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
        <div>
            <label>Description:</label>
            <input 
                id='description'
                type='text'
                placeholder='enter activity description'
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
        </div>
        </form>


           {activities &&
           activities.map(activity => (
               <article key={activity.id}>
                   <div className='activityContainer'>
                       <h3>Activity:</h3>
                       <p>{activity.name}</p>
                       <p>Description: {activity.description}</p>
                   </div>
               </article>
           ))
           }
        </main>
    )
}

export default Activities
