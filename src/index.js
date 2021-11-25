import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import { Activities, Footer, Header, Login, Logout, MyRoutines, Profile, Routines } from './components'
const { handleFetchingActivities } = './handleFuncs.js'
const { API_URL } = './constants.js'
const Index = () => {
    // declare state here...
    const [token, setToken] = useState('');
    const [activities, setActivities] = useState([]);

    // incorporate useEffect here...
    // this useEffect checks is there is a token in browser storage
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken);
        }
        if (!storedToken) setToken('');
        
  }, [])

  useEffect(() => {
    async function getActivities(){
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
    }
    getActivities();
  }, [])
  
    return (
        <BrowserRouter>
            <Header token={token} />
            <Route path='/login' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} token={token}/> } />
            <Route path='/register' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} /> } />
            {/* <Route path='/profile' exact render={() => <Profile /> } /> */}
            <Route path='/activities' exact render={() => <Activities token={token} activities={activities} /> } />
            {/* <Route path='/routines' exact render={() => <Routines /> } /> */}
            { !!token === true &&
                <Route path='/myroutines' exact render={(routeProps) => <MyRoutines {...routeProps} isLoggedIn={!!token} /> } />
            }
            <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} setToken={setToken} /> } />
            {/* <Footer /> */}
        </BrowserRouter>
    )
}

ReactDOM.render(

      <Index />,

  document.getElementById('app')
);
