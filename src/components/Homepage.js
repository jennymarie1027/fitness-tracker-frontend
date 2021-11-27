import React from 'react'
import { Link } from 'react-router-dom'


const Homepage = ({token}) => {
    return (
        <main className='marginTop homepage-container'>
            <h1>Welcome To Fitness Tracker</h1>
            <div className='homepageBtn-container'>
                <button className='homepageBtn'><Link to='/activities'>View Activities</Link></button>
                <button className='homepageBtn'><Link to='/routines'>View Routines</Link></button>
                {token 
                ? <>
                    <button className='homepageBtn'><Link to='/profile'>View Profile</Link></button>
                    <button className='homepageBtn'><Link to='/logout'>Logout</Link></button>
                </>
                :   <button className='homepageBtn'><Link to='/login'>Login</Link></button>
                }
               
            </div>
        </main>
    )
}

export default Homepage


