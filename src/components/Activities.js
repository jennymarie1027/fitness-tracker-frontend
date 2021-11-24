import React, { useState, useEffect } from 'react'
const { API_URL } = '../constants.js';
const { handleFetchingActivities } = '../handleFuncs.js'



const Activities = ({ token, activities }) => {

    
    return (
        <main>
           <h1>Activities Component</h1> 
           {activities &&
           activities.map(activity => (
               <article key={activity.id}>
                   <div className='activityContainer'>
                       <h3> Activity: {activity.name} -- Description: {activity.description}</h3>
                   </div>
               </article>
           ))
           }
        </main>
    )
}

export default Activities
