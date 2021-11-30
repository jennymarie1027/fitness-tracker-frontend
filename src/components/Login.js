import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister } from '../handleFuncs';
const { API_URL } = '../constants.js';

// potentially make the component async?
const Login = ({ match, history, setToken, token, setUsername }) => {

    // const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (match.url === '/register') {
                    try {
                        const res = await handleRegister(username, password, setToken, setUsername, setPassword, setConfirmedPassword);
                        if (res.token) history.push('/activities')
                    } catch (error) {
                        console.log(error)
                    }
                } 
                if (match.path === '/login') {
                    try {
                        const res = await handleLogin(username, password, setToken, setUsername, setPassword)
                        if (res.token) history.push('/activities')
                    } catch (error) {
                        console.log(error)
                    }

                }
            }}
        >
        <h1 className='m-3 '>{match.url === '/login' ? 'Please Sign In' : 'Make An Account'}</h1>
            <div>
                <label>Username</label>
                <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    id='username'
                    required
                    placeholder='Your Username'
                    autoFocus

                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id='password'
                    required
                    placeholder='Your Password'
                    
                />
            </div>
            {match.url === '/register'
            ? ( 
                <div>
                    <label>Confirmed Password</label>
                    <input 
                        type='password'
                        value={confirmedPassword}
                        onChange={e => setConfirmedPassword(e.target.value)}
                        id='confirmedPassword'
                        placeholder='Confirm Password'
                    />
                </div>
            ) : null}
            <button type='submit' >
                Submit
                {/* myroutines/' + localStorage.getItem('username') */}
            </button>
            {
                  match.url === '/register' ?
                  
                  <div className='mt-3'> <Link to='/login'>Already have an account? </Link></div>
                    : <div className='mt-3'><Link to='register'>Don't have an account?</Link></div>
                    
                }
        </form>
    )
}

export default Login;

// onClick={() => {isLoggedIn && history.push('/activities')}}