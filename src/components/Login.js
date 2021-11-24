import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister} from '../handleFuncs';
const { API_URL } = '../constants.js';

// potentially make the component async?
const Login = ({ match, history, setToken, isLoggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (match.url === './register') {
                    const parsedData = await handleRegister(username, password, confirmedPassword);
                    console.log('parsedData = ', parsedData);
                }
                if (match.url === './login') await handleLogin(username, password, setToken);
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
            <button type='submit' onClick={() => {isLoggedIn && history.push('/')}}>
                Submit
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
