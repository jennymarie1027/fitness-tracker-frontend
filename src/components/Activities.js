import React from 'react'
import CreateActivity from './CreateActivity';

const Activities = ({ token, activities, setActivities, history }) => {
    return (
        <main style={{margin: 4 +'em'}}>
            <button onClick={() => {
                history.push('/newactivity');
                console.log(history)
            }}>Create a New Activity</button>
        {/* { token ? <CreateActivity setActivities={setActivities} token={token} /> : null } */}

        <h1>All Activities</h1> 
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
    )}

export default Activities
