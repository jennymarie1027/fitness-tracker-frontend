import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import { Activities, Footer, Header, Login, Logout, MyRoutines, Profile, Routines } from './components'


const Index = () => {
    // declare state here...
    const [token, setToken] = useState('');


    // incorporate useEffect here...
    // this useEffect checks is there is a token in browser storage
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
        setToken(storedToken);
        }
        if (!storedToken) setToken('');
        
  }, [])
    return (
        <BrowserRouter>
            {/* <Header token={token} /> */}
            <Route path='/login' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} isLoggedIn={!!token}/> } />
            {/* <Route path='/profile' exact render={() => <Profile /> } /> */}
            {/* <Route path='/activities' exact render={() => <Activities /> } /> */}
            {/* <Route path='/routines' exact render={() => <Routines /> } /> */}
            {/* <Route path='/myroutines' exact render={() => <MyRoutines /> } /> */}
            {/* <Route path='/logout' exact render={() => <Logout /> } /> */}
            {/* <Footer /> */}
        </BrowserRouter>
    )
}

ReactDOM.render(

      <Index />,

  document.getElementById('app')
);
