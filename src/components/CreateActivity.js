import React, { useState, useEffect } from 'react'
import { handleFetchingActivities, handleAddingActivity } from '../handleFuncs.js';

const CreateActivity = ({ setActivities, token, history }) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    return (
        <div className='newActivityContainer'>
            <h2>Create A New Activity:</h2>
            <form className='row g-3'
            onSubmit={async (e) => {
                e.preventDefault();
                try {
                    const data = await handleAddingActivity(name, description, token);
                    if (data.error) {
                        alert('That activity already exists')
                        setName('')
                        setDescription('')
                    } else {
                        const res = await handleFetchingActivities();
                        setActivities(res);
                        history.push('/activities')
                    }
                } catch (err) {
                    console.error(err)
                }
            
            }}>
            <div className='col-md-4'>
                <label className='form-label' for='name'>Name:</label>
                <input 
                    className='form-control'
                    id='name'
                    type='text'
                    placeholder='activity name'
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className='col-md-8'>
                <label className='form-label' for='description'>Description:</label>
                <input 
                    className='form-control'
                    id='description'
                    type='text'
                    placeholder='activity description'
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className='col-md-12'>
                <button className='btn btn-primary'>Submit!</button>
            </div>
            </form>
        </div>
    )
}

export default CreateActivity
