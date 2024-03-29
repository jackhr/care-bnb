import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import CaregiverPage from '../CaregiverPage/CaregiverPage';
import NavBar from '../../components/NavBar/NavBar';
import Chat from '../../components/Chat/Chat';
import './App.css';
import BecomeCaregiverPage from '../BecomeCaregiverPage/BecomeCaregiverPage';
import AllCaregivers from '../../pages/AllCaregivers/AllCaregivers';
import SingleCaregiver from '../../pages/CaregiverPage/SingleCaregiver';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [caregivers, setCaregivers] = useState([]);
  
  return (
    <main className="App">

      { user ? 
        <>
          <Switch>
            <Route path="/update-profile">
              <BecomeCaregiverPage />
            </Route>
            <Route path="/profile">
              <CaregiverPage caregivers={caregivers} setCaregivers={setCaregivers} />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/caregivers">
              <AllCaregivers />
            </Route>
            {/* <Route path="/caregivers/:id">
              <SingleCaregiver id={id} />
            </Route> */}
            <Redirect to="/caregivers" />
            {/* here let's redirect to profile page */}
          </Switch>

          <NavBar user={user} setUser={setUser} />
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
