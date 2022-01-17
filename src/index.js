import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom';
import { Activities, Footer, Header, Login, Logout, MyRoutines, MySingleRoutine, Routines, Homepage, NewRoutine, EditRoutine, AddingRoutineActivity } from './components'
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
    const [routineId, setRoutineId] = useState(0)

    const [updateName, setUpdateName] = useState('')
    const [updateGoal, setUpdateGoal] = useState('')
    const [updateIsPublic, setUpdateIsPublic] = useState(false)
    const [updateCount, setUpdateCount] = useState(0)
    const [updateDuration, setUpdateDuration] = useState(0)

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
            <Header token={token} />
            <Route path='/login' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} token={token}/> } />
            <Route path='/register' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} /> } />
            <Route path='/activities' exact render={(routeProps) => <Activities {...routeProps} token={token} activities={activities} setActivities={setActivities}/> } />
            <Route path='/routines' exact render={(routeProps) => <Routines setRoutines={setRoutines} routines={routines} {...routeProps} /> } />
            <Route path='/newRoutine' exact render={(routeProps) => <NewRoutine setMyRoutines={setMyRoutines} myRoutines={myRoutines} token={token} {...routeProps} /> } />
            <Route path='/editRoutine/:routineId' exact render={(routeProps) => <EditRoutine {...routeProps} myRoutines={myRoutines} setRoutineId={setRoutineId} routineId={routineId} token={token} selectedRoutine={selectedRoutine} routineId={routineId} updateName={updateName} setUpdateName={setUpdateName} updateGoal={updateGoal} setUpdateGoal={setUpdateGoal} updateIsPublic={updateIsPublic} setUpdateIsPublic={setUpdateIsPublic} /> } />
            <Route path='/addRoutineActivity/:routineId' exact render={(routeProps) => <AddingRoutineActivity {...routeProps} myRoutines={myRoutines} setSelectedRoutine={setSelectedRoutine} selectedRoutine={selectedRoutine} token={token} routineId={routineId} updateCount={updateCount} activities={activities} setUpdateCount={setUpdateCount} updateDuration={updateDuration} setUpdateDuration={setUpdateDuration} /> } />
            { token &&
                <Route path='/myroutines' exact render={(routeProps) => <MyRoutines {...routeProps} activities={activities} isLoggedIn={!!token} myRoutines={myRoutines} setMyRoutines={setMyRoutines} token={token} /> } />
              }
            <Route path='/newactivity' exact render={(routeProps) => <CreateActivity {...routeProps} setActivities={setActivities} token={token} />}/>
            <Route path='/myroutines/:routineId' exact render={(routeProps) => <MySingleRoutine {...routeProps} updateIsPublic={updateIsPublic} setUpdateIsPublic={setUpdateIsPublic} setUpdateName={setUpdateName} updateName={updateName} updateGoal={updateGoal} setUpdateGoal={setUpdateGoal} setRoutineId={setRoutineId} routineId={routineId} activities={activities} token={token} selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} myRoutines={myRoutines} />} />
            <Route path='/myroutines/:routineId/:routineActivityId' exact render ={(routeProps) => <EditingRoutineActivity {...routeProps} token={token} routineId={routineId} />}/>
            <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} setToken={setToken} /> } />
            <Route path='/' exact render={() => <Homepage token={token} />}/>
        </BrowserRouter>
    )
}

ReactDOM.render(
      <Index />,
  document.getElementById('app')
);
