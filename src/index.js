import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import Activities from './components/Activities'
import Footer from './components/Footer';
import Header from './components/Header'
import Login from './components/Login';
import Logout from './components/Logout'
import Profile from './components/Profile'
import Routines from './components/Routines'
import MyRoutines from './components/MyRoutines'


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
            <Header token={token} />
            <Route path='/login' exact render={() => <Login /> } />
            <Route path='/profile' exact render={() => <Profile /> } />
            <Route path='/activities' exact render={() => <Activities /> } />
            <Route path='/routines' exact render={() => <Routines /> } />
            <Route path='/myroutines' exact render={() => <MyRoutines /> } />
            <Route path='/logout' exact render={() => <Logout /> } />
            <Footer />
        </BrowserRouter>
    )
}

ReactDOM.render(
    <BrowserRouter>
      <Route path='/' component={Index} />
    </BrowserRouter>,
  document.getElementById('app')
);
