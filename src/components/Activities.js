import React from 'react'
import CreateActivity from './CreateActivity';
const API_URL = '../constants.js';
const { handleFetchingActivities } = '../handleFuncs.js'

const Activities = ({ token, activities, setActivities }) => {
    return (
        <main style={{margin: 4 +'em'}}>
        { token ? <CreateActivity setActivities={setActivities} token={token} /> : null }

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
