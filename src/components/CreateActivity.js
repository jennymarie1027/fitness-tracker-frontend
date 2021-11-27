import React, { useState, useEffect } from 'react'
const { handleFetchingActivities } = '../handleFuncs.js'
const CreateActivity = ({ setActivities, token, activities }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setActivities(activities)
    }, [description])

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
                    // const data = await handleFetchingActivities();
                    const res =  await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      }).then(response => response.json())
                      .then(result => {
                        return result;
                      })
                      .catch(console.error);
                    console.log(res);
                    setActivities(res);
                    setName('')
                    setDescription('')
                }
            } catch (err) {
                console.error(err)
            }
        
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
