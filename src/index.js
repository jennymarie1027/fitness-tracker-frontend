import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import { Activities, Footer, Header, Login, Logout, MyRoutines, MySingleRoutine, Routines, Homepage } from './components'
import CreateActivity from './components/CreateActivity';
import EditingRoutineActivity from './components/User/EditingRoutineActivity';
import {handleFetchingRoutines} from './handleFuncs'
import { handleFetchingUserRoutines } from './handleFuncs';

const Index = () => {
    const [token, setToken] = useState('');
    const [activities, setActivities] = useState([]);
    const [myRoutines, setMyRoutines] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState({})
    

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken);
        }
        if (!storedToken) setToken('');
        
  }, [])

  useEffect(async ()=> {                  
    const results = await handleFetchingRoutines();     
    setRoutines( results );
}, []); 

  useEffect(async () => {
    let username = localStorage.getItem('username');
    let token = localStorage.getItem('token')
    if (username) {
      const fetchedRoutines = await handleFetchingUserRoutines(username, setMyRoutines, token)
      setMyRoutines(fetchedRoutines)
    } 
  }, [])


  useEffect(() => {
    async function getActivities(){
      const res =  await fetch('https://fitnesstrac-kr.herokuapp.com/api/activities', {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
        .then(result => {
          return result;
        })
        .catch(console.error);
      setActivities(res);
  }
  getActivities();
  }, [])
  
    return (
        <BrowserRouter>
            <Header token={token} username={localStorage.getItem('username')} />
            <Route path='/login' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} token={token}/> } />
            <Route path='/register' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} /> } />
            <Route path='/activities' exact render={(routeProps) => <Activities {...routeProps} token={token} activities={activities} setActivities={setActivities}/> } />
            <Route path='/routines' exact render={(routeProps) => <Routines setRoutines={setRoutines} routines={routines} setMyRoutines={setMyRoutines} {...routeProps} /> } />
            <Route path='/routines/:userId' exact render={(routeProps) => <MyRoutines {...routeProps} isLoggedIn={!!token} myRoutines={myRoutines} setMyRoutines={setMyRoutines} token={token} routines={routines} setRoutines={setRoutines} username={localStorage.getItem('username')}/> } />
            <Route path='/newactivity' exact render={(routeProps) => <CreateActivity {...routeProps} setActivities={setActivities} token={token} />}/>
            <Route path='/routines/:userId/:routineId' exact render={(routeProps) => <MySingleRoutine {...routeProps} activities={activities} token={token} selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} myRoutines={myRoutines} username={localStorage.getItem('username')}/>} />
            <Route path='/routines/:userId/:routineId/:routineActivityId' exact render ={(routeProps) => <EditingRoutineActivity {...routeProps} token={token} username={localStorage.getItem('username')}/>}/>
            <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} setToken={setToken} /> } />
            <Route path='/' exact render={() => <Homepage token={token} username={localStorage.getItem('username')} />}/>
        </BrowserRouter>
    )
}

ReactDOM.render(
      <Index />,
  document.getElementById('app')
);
