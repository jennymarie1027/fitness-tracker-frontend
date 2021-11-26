import React, { useState } from 'react'

const CreateActivity = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div>
            <h2>Create A New Activity:</h2>
        <form onSubmit={async (e) => {
            e.preventDefault();
            try {
                const res = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
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
                if (data.error) {
                    alert('That activity already exists')
                    setName('')
                    setDescription('')
                } else {
                    const data = await handleFetchingActivities();
                    setActivities(data);
                    setName('')
                    setDescription('')
                }
                
            } catch (err) {
                console.error(err)
            }
            // handleNewActivitySubmit(name, description)
        
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
        <button>Submit!</button>
        </form>
        </div>
    )
}

export default CreateActivity
