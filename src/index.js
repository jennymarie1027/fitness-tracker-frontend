import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import { Activities, Footer, Header, Login, Logout, MyRoutines, MySingleRoutine, Routines, Homepage } from './components'
import EditingRoutineActivity from './components/User/EditingRoutineActivity';
import {handleFetchingRoutines} from './handleFuncs'

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
            <Header token={token} />
            <Route path='/login' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} token={token}/> } />
            <Route path='/register' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} /> } />
            <Route path='/activities' exact render={() => <Activities token={token} activities={activities} setActivities={setActivities}/> } />
            <Route path='/routines' exact render={(routeProps) => <Routines setRoutines={setRoutines} routines={routines} {...routeProps} /> } />
            { token &&
                <Route path='/myroutines' exact render={(routeProps) => <MyRoutines {...routeProps} activities={activities} isLoggedIn={!!token} myRoutines={myRoutines} setMyRoutines={setMyRoutines} token={token} /> } />
            }
            <Route path='/myroutines/:routineId' exact render={(routeProps) => <MySingleRoutine {...routeProps} activities={activities} token={token} selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} myRoutines={myRoutines} />} />
            <Route path='/myroutines/:routineId/:routineActivityId' exact render ={(routeProps) => <EditingRoutineActivity {...routeProps} token={token} />}/>
            <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} setToken={setToken} /> } />
            <Route path='/' exact render={() => <Homepage token={token} />}/>
        </BrowserRouter>
    )
}

ReactDOM.render(
      <Index />,
  document.getElementById('app')
);
