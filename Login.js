import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister} from '../handleFuncs';
const { API_URL } = '../constants.js';

// potentially make the component async?
const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
        <form>
            
        </form>
    )
}

export default Login
