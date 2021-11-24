import React, { useState, useEffect } from 'react';
import newRoutine from './newRoutine';
const { API_URL } = '../constants.js';

const MyRoutines = ({isLoggedIn}) => {
    const [myRoutines, setMyRoutines] = useState([])

    return (
        <div>
            <h1>My routines</h1>
            <newRoutine setMyRoutines={setMyRoutines} />
        </div>
    )
}

export default MyRoutines;