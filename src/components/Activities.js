import React from 'react'

const Activities = ({ token, activities, history }) => {
    return (
        <main style={{margin: 4.5 +'em'}}>
            
        { token ? 
            <button  className='btn btn-primary mb-3 mt-3'
                onClick={() => {
                    history.push('/newactivity');
                    console.log(history)
            }}>Create a New Activity</button>
        : null }

        <h1>Activities</h1> 
        <table>
            <thead>
                <tr className='sticky-top'>
                    <th>Activity Name</th>
                    <th>Activity Description</th>
                </tr>
            </thead>
            <tbody>
               {activities.length ? (
                   activities.map(activity => (
                       <>
                        <tr scope='row' key={activity.id}></tr>
                        <td>{activity.name}</td>
                        <td>{activity.description}</td>
                       </>
                   ))
               ) : null} 
            </tbody>
        </table>
        </main>
    )}

export default Activities
