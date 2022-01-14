import React from 'react'

const Activities = ({ token, activities, history }) => {
    return (
        <main style={{margin: 4.5 +'em'}} className='allActivitiesContainer'>
            
        { token ? 
            <button  className='btn btn-primary mb-3 mt-3 newActivity'
                onClick={() => {
                    history.push('/newactivity');
                    console.log(history)
            }}>Create a New Activity</button>
        : null }

        <h1>Activities</h1> 
        <table>
            <thead>
                <tr>
                    <th>Activity Name:</th>
                    <th>Activity Description:</th>
                </tr>
            </thead>
            <tbody>
               {activities.length ? (
                   activities.map(activity => (
                    <tr scope='row' key={activity.id} className='activityRow'>
                        <td>{activity.name}</td>
                        <td>{activity.description}</td>
                    </tr>
                   ))
               ) : null} 
            </tbody>
        </table>
        </main>
    )}

export default Activities
